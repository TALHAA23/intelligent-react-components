import fs from "fs/promises";
import { format } from "prettier";
import { AIResponse } from "../types";
import createFunctionDefinationFromGlobals from "./createFunctionDefinationsFromGlobals.js";
import log from "./cliColoredLog.js";

const createFile = async (
  content: () => unknown,
  filename: string,
  responseObj?: AIResponse
) => {
  log("6.1: Extracting helper functions from global definitions").subStep();
  const helperFunctions = createFunctionDefinationFromGlobals(
    responseObj?.response
  );

  log("6.2: Determining project root directory").subStep();
  const rootDir = process.cwd();

  log("6.3: Creating 'dynamic' directory if it doesn't exist").subStep();
  await fs.mkdir(`${rootDir}/dynamic`, { recursive: true });

  log("6.4: Formatting the generated content").subStep();
  const formattedCode = await format(`export default ${content.toString()}`, {
    parser: "babel",
  });

  log("6.5: Writing the formatted code to the file system").subStep();
  await fs.writeFile(
    `${rootDir}/dynamic/${filename}.js`,
    `${
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
    export const meta = {
     thoughts: "${responseObj?.thoughts}",
     expect: "${responseObj?.expect}"
    }
    `
  );

  log(
    `6.6: File '${filename}.js' has been successfully created in the 'dynamic' directory`
  ).subStep();
};

export default createFile;
