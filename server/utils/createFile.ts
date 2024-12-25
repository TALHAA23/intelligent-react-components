import fs from "fs/promises";
import { format } from "prettier";
import { AIResponse } from "../types";
import createFunctionDefinationFromGlobals from "./createFunctionDefinationsFromGlobals.js";

const createFile = async (
  content: () => unknown,
  filename: string,
  responseObj?: AIResponse
) => {
  const helperFunctions = createFunctionDefinationFromGlobals(responseObj?.response);
  const rootDir = process.cwd();
  await fs.mkdir(`${rootDir}/dynamic`, { recursive: true });
  const formattedCode = await format(`export default ${content.toString()}`, {
    parser: "babel",
  });
  
  await fs.writeFile(
    `${rootDir}/dynamic/${filename}.js`,
    `${responseObj?.response?.imports?.toString().replace(/,\s*import/g, '; import') + ';'};
    const globals=${JSON.stringify(responseObj?.response?.globals||{})};
    ${await format(helperFunctions.toString().replaceAll(/\}\s*,\s*(function)/g, '}; $1'),{parser:"babel"})}
    ${formattedCode}
    export const meta = {
     thoughts: "${responseObj?.thoughts}",
     expect: "${responseObj?.expect}"
    }
    `
  );
};

export default createFile;
