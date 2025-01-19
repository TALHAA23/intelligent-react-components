import run from "../lib/generativeAi.js";
import { Common, RouteHandler } from "../types/index.js";
import clearResponse from "../utils/responseCleaner.js";
import createFile from "../utils/createFile.js";
import log from "../utils/cliColoredLog.js";
import { GoogleGenerativeAIError } from "@google/generative-ai";
const processPromptAndCreateFile: RouteHandler = async (req, res) => {
  log("1. Extracting the request body").step();
  const body = req.body as Common;

  try {
    log("2. Initiating request to Google AI").step();
    const generatedResponse = await run(body);

    log("3. Processing response received from Google AI").step();
    const cleanedResponse = clearResponse(generatedResponse);

    log("4. Sanitizing and validating the response").step();
    if (Object.keys(cleanedResponse.error).length) {
      return res.json(cleanedResponse);
    }

    log("5. Preparing to create the file").step();
    const wrapperAnonyousFunction = new Function(
      `return ${cleanedResponse.response?.eventListener}`
    );
    const generatedFunction = wrapperAnonyousFunction();

    log("6. Generating file with the provided content").step();
    const newFilePath = await createFile(
      generatedFunction,
      body.filename,
      cleanedResponse
    );

    log("7. File generation completed successfully").step();
    res.json({ newFilePath });
  } catch (err) {
    const message = (err as unknown as GoogleGenerativeAIError).message;
    log(`An error occurred: ${message}`).error();
    res.status(500).json({ message });
  }
};

export default processPromptAndCreateFile;
