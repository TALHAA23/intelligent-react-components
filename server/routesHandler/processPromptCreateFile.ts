import run from "../lib/generativeAi.js";
import { Common, RouteHandler } from "../types/index.js";
import clearResponse from "../utils/responseCleaner.js";
import createFile from "../utils/createFile.js";
import { GoogleGenerativeAIError } from "@google/generative-ai";
import CLI from "../utils/chalk.js";

const retryContext = {
  retry: true,
  feedback: "",
  retryCount: 0,
};
const processPromptAndCreateFile: RouteHandler = async (req, res) => {
  const body = req.body as Common;
  if (retryContext.feedback) {
    CLI.subsection("Constructing new Body");
    if (!body.feedback) body.feedback = "";
    body.feedback = body.feedback?.concat(retryContext.feedback);
  }
  CLI.section(`Request Initiated for "${body.filename}"`);

  CLI.subsection("1. Extracting the request body");

  try {
    CLI.subsection("2. Initiating request to Google AI");
    const generatedResponse = await run(body);

    CLI.subsection("3. Processing response received from Google AI");
    const cleanedResponse = clearResponse(generatedResponse);

    CLI.subsection("Generated Code");
    console.log(cleanedResponse);

    CLI.subsection("4. Sanitizing and validating the response");
    if (cleanedResponse?.error && Object.keys(cleanedResponse?.error).length) {
      CLI.section("Error Details");
      console.log(cleanedResponse.error);
      if (/^(?!2\d{2}$).*/.test(cleanedResponse.error.status.toString()))
        return res.json(cleanedResponse);
    }

    CLI.subsection("5. Generating file with the provided content");
    const newFilePath = await createFile(body.filename, cleanedResponse);

    CLI.subsection(`6. File "${body.filename}" created successfully.`);

    CLI.print(
      CLI.format(
        "\nInspect the generated code, If any changes are required change and hit save to rebuild the library.",
        "bgGreen"
      )
    );
    res.json({ newFilePath });
  } catch (err) {
    const generativeAiError = err as unknown as GoogleGenerativeAIError;
    CLI.section("Error Details");
    console.log(err);

    if (retryContext.retry && retryContext.retryCount <= 3) {
      retryContext.retry = false;
      retryContext.retryCount = retryContext.retryCount + 1;
      retryContext.feedback =
        "Please resolve the errors: " +
        (err as unknown as { message: string })?.message;
      CLI.subsection(`Retry ${retryContext.retryCount}`);
      processPromptAndCreateFile(req, res);
    }

    res.status(500).json({ message: generativeAiError.message });
  }
};

export default processPromptAndCreateFile;
