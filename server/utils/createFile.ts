import fs from "fs/promises";
import { format } from "prettier";
import { AIResponse } from "../types";
import createFunctionDefinationFromGlobals from "./createFunctionDefinationsFromGlobals.js";
// interface Glob {
//   [key: string]: any;
// }
const createFile = async (
  content: () => unknown,
  filename: string,
  responseObj?: AIResponse
) => {
  const fns = createFunctionDefinationFromGlobals(responseObj?.response);
  const rootDir = process.cwd();
  await fs.mkdir(`${rootDir}/dynamic`, { recursive: true });
  const formattedCode = await format(`export default ${content.toString()}`, {
    parser: "babel",
  });
  // ! Solution - Do no delete
    // ${await format(Object.values(responseObj?.response?.globals||{}).toString().replace(",",";"),{parser:"babel"})}
  // ! -----------------------
  // const globals=${JSON.stringify(responseObj?.response?.globals)};
  // const val = JSON.stringify(responseObj?.response?.globals,()=>{createFunctionDefinationFromGlobals(responseObj?.response)})
 console.log("Functions: ",fns)
  await fs.writeFile(
    `${rootDir}/dynamic/${filename}.js`,
    `${responseObj?.response?.imports?.toString().replace(/,\s*import/g, '; import') + ';'};
    const globals=${JSON.stringify(responseObj?.response?.globals||{})};
    ${await format(fns.toString().replaceAll(/}\s*,\s*/g, '};'),{parser:"babel"})}
    ${formattedCode}
    export const meta = {
     thoughts: "${responseObj?.thoughts}",
     expect: "${responseObj?.expect}"
    }
    `
  );
};

export default createFile;
