import fs from "fs/promises";
import { format } from "prettier";
import { AIResponse } from "../types";
import createFunctionDefinationFromGlobals from "./createFunctionDefinationsFromGlobals.js";
import log from "./cliColoredLog.js";
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

  log("5.1: Extracting helper functions from global definitions").subStep();
  const helperFunctions = createFunctionDefinationFromGlobals(
    responseObj?.response
  );

  log("5.2: Determining project root directory").subStep();
  const rootDir = process.cwd();

  log("5.3: Creating 'dynamic' directory if it doesn't exist").subStep();
  await fs.mkdir(`${rootDir}/dynamic`, { recursive: true }).then(async () => {
    await fs.mkdir(`${rootDir}/dynamic/css`, { recursive: true });
  });

  log("5.4: Formatting the generated content").subStep();
  const formattedCode = await format(
    `export default ${stringToFunctionDefination(responseObj?.response?.eventListener)}`,
    {
      parser: "babel",
    }
  );

  log("5.5: Writing the formatted code to the file system").subStep();
  if (css) {
    await fs.writeFile(`${rootDir}/dynamic/css/${filename}.css`, css);
  }
  await fs.writeFile(
    `${rootDir}/dynamic/${filename}.js`,
    `
${css ? `import "./css/${filename}.css"` : "\n"}
${
  responseObj?.response?.imports
    ?.toString()
    .replace(/,\s*import/g, "; import") + ";"
};
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

  log(
    `5.5: File '${filename}.js' has been successfully created in the 'dynamic' directory`
  ).subStep();
};

export default createFile;
