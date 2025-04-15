import fs from "fs/promises";
import { format } from "prettier";
import { AIResponse } from "../types";
import createFunctionDefinationFromGlobals from "./createFunctionDefinationsFromGlobals.js";
import stringToFunctionDefination from "./stringToFunctionDefination.js";

const createFile = async (filename: string, responseObj?: AIResponse) => {
  const css = responseObj?.response?.CSS?.styles;
  const isThereInitialRender = responseObj?.response?.onInitialRender;
  const onInitialRender =
    isThereInitialRender &&
    (await format(
      `export ${stringToFunctionDefination(responseObj?.response?.onInitialRender)}`,
      {
        parser: "babel",
      }
    ));
  const isThereFormBuilder = responseObj?.response?.formBuilder;
  const formBuilder =
    isThereFormBuilder &&
    (await format(
      `export ${stringToFunctionDefination(responseObj?.response?.formBuilder)}`,
      {
        parser: "babel",
      }
    ));

  const helperFunctions = createFunctionDefinationFromGlobals(
    responseObj?.response
  );

  const rootDir = process.cwd();

  await fs.mkdir(`${rootDir}/dynamic`, { recursive: true }).then(async () => {
    await fs.mkdir(`${rootDir}/dynamic/css`, { recursive: true });
  });
  const formattedCode = await format(
    `export default ${stringToFunctionDefination(responseObj?.response?.eventlistener)}`,
    {
      parser: "babel",
    }
  );

  if (css) {
    await fs.writeFile(`${rootDir}/dynamic/css/${filename}.css`, css);
  }
  await fs.writeFile(
    `${rootDir}/dynamic/${filename}.js`,
    `
${css ? `import "./css/${filename}.css"` : "\n"}
${responseObj?.response?.imports?.length ? responseObj?.response?.imports?.join(";" + "\n") : "// Intelligent React Components" + "\n"};
const globals=${JSON.stringify(responseObj?.response?.globals || {})};
${await format(
  helperFunctions
    .toString()
    .replaceAll(/\}\s*,\s*(async\s*function|function)/g, "}; $1"),
  { parser: "babel" }
)}
${formattedCode}
${isThereFormBuilder ? formBuilder : "\n"}
${isThereInitialRender ? onInitialRender : "\n"}
export const meta = {
 thoughts: "${responseObj?.thoughts}",
 expect: "${responseObj?.expect}"
}
`
  );
};

export default createFile;
