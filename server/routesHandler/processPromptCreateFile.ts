import run from "../lib/generativeAi.js";
import { AIButtonProps, RouteHandler } from "../types/index.js";
import clearResponse from "../utils/responseCleaner.js";
import createFile from "../utils/createFile.js";
import log from "../utils/cliColoredLog.js";
import { GoogleGenerativeAIError } from "@google/generative-ai";
const processPromptAndCreateFile: RouteHandler = async (req, res) => {
  const body = req.body as AIButtonProps;

  try {
    const generatedResponse = await run(body);
    const cleanedResponse = clearResponse(generatedResponse);
    if (Object.keys(cleanedResponse.error).length) {
      return res.json(cleanedResponse);
    }
    const wrapperAnonyousFunction = new Function(
      `return ${cleanedResponse.response?.eventListener}`
    );
    // if(cleanedResponse.response?.globals)
    //   cleanedResponse.response.globals = createFunctionDefinationFromGlobals(cleanedResponse.response)

    console.log("Response is ready: ", cleanedResponse);
    const generatedFunction = wrapperAnonyousFunction();
    const newFilePath = await createFile(
      generatedFunction,
      body.filename,
      cleanedResponse
    ); 
    res.json({ newFilePath });
  } catch (err) {
    const message = (err as unknown as GoogleGenerativeAIError).message;
    log("Error: ", message).error();
    res.status(500).json({ message });
  }
};

export default processPromptAndCreateFile;
