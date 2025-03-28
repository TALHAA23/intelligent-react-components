import fs from "fs";
import path from "path";
import type { Element } from "../types";
import dynamicInstructions from "./dynamicInstructions.js";

enum Keys {
  "supportingProps" = "supportingProps",
  "database" = "supportingProps.database",
  "mutation" = "mutation",
  "formDefination" = "formDefination",
}

export default function instructionHandler(target: Element, keys: string[]) {
  const root = path.resolve(
    import.meta.dirname,
    "../../../public/instructions"
  );
  const context: (string | null)[] = [];
  const keysIncludes = (key: string) => keys.includes(key);

  // **  collect general instrucitions ** //
  const generalInstructions = importMarkdown(`${root}/general_instruction.md`);

  if (generalInstructions) {
    const replacements: { [key: string]: string } = {
      ELEMENT_TYPE: target.toUpperCase(),
    };

    let updatedGeneralInstruction = replacePlaceholders(
      generalInstructions,
      replacements
    );

    if (target === "form") {
      updatedGeneralInstruction = updatedGeneralInstruction.concat(
        dynamicInstructions.formSpecficInstruction
      );
    }

    context.push(updatedGeneralInstruction);
  }
  // ** Collect expected Input instructions ** //
  let expectedInputInstruction = importMarkdown(
    `${root}/expectedInput/expected_input_instructions.md`
  );
  if (expectedInputInstruction) {
    const replacement = {
      ELEMENT_TYPE: target.toUpperCase(),
      ELEMENT_SPECIFIC_REQUIRED_KEYS: selectInsturction(
        {
          button: "",
          input:
            '- `"type"`: A string representing the input type (e.g., `"text"`, `"password"`, `"email"`, etc.). This key helps the model generate code tailored to the specific input type',
          form: "",
        },
        target
      ),
      ELEMENT_SPECIFIC_OPTIONAL_KEYS: selectInsturction(
        {
          button: "",
          input: "",
          form: '- `"layout"`: Hints for the desired form layout (e.g., `"one-column"`, `"two-column"`, `"grid"`).\n- `"styleHint"`: Guidelines for the visual style of the form (e.g., `"Material Design"`, `"Bootstrap"`). \n- `"validate"`: Instructions for form validation.\n- `"fieldDefinitions"`: An array of objects defining individual form fields.\n- `"multiStep"`: Configuration for multi-step forms.',
        },
        target
      ),
    };
    expectedInputInstruction = replacePlaceholders(
      expectedInputInstruction,
      replacement
    );
    context.push(expectedInputInstruction);
  }
  // **   collect proccessing steps ** //
  let proccessingInstructions = importMarkdown(
    `${root}/processingInstructions/processing_instructions.md`
  );
  if (proccessingInstructions) {
    const replacement = {
      ELEMENT_TYPE: target.toUpperCase(),
      INPUT_VALIDATION_ADDITIONS:
        target == "input"
          ? '**Ensure the `type` key is present and valid (e.g., `"text"`, `"password"`, `"email"`, etc.)**'
          : "",
      CODE_GENERATION_ADDITIONS:
        target == "form"
          ? "**Always call the `event.preventDefaults()` method to disable the form default behaviour**"
          : "",
      FORM_BUILDER_PLACEHOLDER: target == "form" ? "`formBuilder`, " : "",
      _PROCCESSING_DATABASE_KEYWORDS_: keysIncludes(Keys.database)
        ? "Identify keywords indicating database operations (e.g., fetch, insert, update, delete)"
        : "",
      _MUTATION_HANDLING_: keysIncludes(Keys.mutation)
        ? dynamicInstructions.mutationHandlingProccessingSteps
        : "",
      _DATABASE_CONFIGURATION_: keysIncludes(Keys.database)
        ? dynamicInstructions.databaseConfigProccessingSteps
        : "",
      _ELEMENT_SPECIFIC_PROCESSING_: keysIncludes(Keys.supportingProps)
        ? dynamicInstructions.formDefinationProccessingSteps
        : "",
    };
    proccessingInstructions = replacePlaceholders(
      proccessingInstructions,
      replacement
    );
    context.push(proccessingInstructions);
  }

  // ** collect globals object instruction ** //
  let globalsObjInstruction = importMarkdown(
    `${root}/globals/globals_instructions.md`
  );

  if (globalsObjInstruction) {
    const replacements = {
      GLOBAL_VARIABLE_EXAMPLE_KEY: selectInsturction(
        {
          input: "isValid",
          button: "numberofClick",
          form: "isSubmitting",
        },
        target
      ),
      GLOBAL_VARIABLE_EXAMPLE_VALUE: selectInsturction(
        {
          input: "Storing the rules for change input state such as disable",
          button: "Store the number of clicks to presist for subsequent clicks",
          form: "Store the reference of submit button to change for any function",
        },
        target
      ),
      ELEMENT_SPECIFIC_USE_CASES: `${target.toUpperCase()} Specific Examples`,
    };

    globalsObjInstruction = replacePlaceholders(
      globalsObjInstruction,
      replacements
    );

    const globalsExamples = importMarkdown(
      `${root}/globals/globalsExamples/${target}.md`
    );
    context.push(globalsObjInstruction.concat(globalsExamples || ""));
  }

  // ** collect helper function instructions. ** //
  let helperFunctionInstruction = importMarkdown(
    `${root}/helperFunctions/helperfunctions_instructions.md`
  );

  if (helperFunctionInstruction) {
    const replacements = {
      ELEMENT_SPECIFIC_USE_CASES: `${target.toUpperCase()} Specific Examples`,
      HELPER_FUNCTION_EXAMPLE:
        "async function apiRequest() { /*api handling logic...*/}",
      HELPER_FUNCTION_CALL_EXAMPLE: "apiRequest()",
    };

    helperFunctionInstruction = replacePlaceholders(
      helperFunctionInstruction,
      replacements
    );

    const helperFunctionExamples = importMarkdown(
      `${root}/helperFunctions/helperFunctionExamples/${target}.md`
    );
    context.push(
      helperFunctionInstruction.concat(helperFunctionExamples || "")
    );
  }
  //   ** Preventing Duplicate DOM Element ** //
  let preventDuplicateDomElementInstructions = importMarkdown(
    `${root}/preventDuplicateDOMElement/prevent_duplicate_dom_element_instructions.md`
  );
  if (preventDuplicateDomElementInstructions) {
    const replacement = {
      ELEMENT_TYPE: target.toUpperCase(),
      INTERACTION_TYPE: selectInsturction(
        {
          button: "click, or any mouse event",
          input: "input, change or any input related event",
          form: "submit, or any form related event",
        },
        target
      ),
      ELEMENT_SPECIFIC_INSTRUCTIONS: selectInsturction(
        {
          button: "",
          input: "",
          form: "7. **Handle Dynamic Content:**\n If the form needs to dynamically add or remove elements (e.g., adding new fields based on user input), the model should implement this logic carefully to avoid creating duplicate elements.",
        },
        target
      ),
    };
    preventDuplicateDomElementInstructions = replacePlaceholders(
      preventDuplicateDomElementInstructions,
      replacement
    );
    context.push(preventDuplicateDomElementInstructions);
  }
  //   ** Collect instruction to handle invalid-irrelevant requests ** //
  let handleInvalidIrrelevantInstruction = importMarkdown(
    `${root}/handleInvalidIrrelevantRequests/handle_invalid_irrelevant_requests_instruction.md`
  );

  if (handleInvalidIrrelevantInstruction) {
    const replacement = {
      ELEMENT_TYPE: target.toUpperCase(),
      MISSING_KEYS_DETAILS: selectInsturction(
        {
          button: "The following keys are missing: listener, prompt.",
          input: "The following keys are missing: listener, prompt, or type.",
          form: "The input is not valid JSON or does not conform to the expected AIFormProps interface. Please refer to the documentation for the correct input format.",
        },
        target
      ),
      INVALID_DATA_TYPE_DETAILS: selectInsturction(
        {
          button:
            "The 'prompt' field should be a string, but a number was provided.",
          input:
            "The request is not related to generating a JavaScript event listener function for a DOM element (such as 'input' or 'button'). Please provide a valid JSON input.",
          form: "The input is not valid JSON or does not conform to the expected AIFormProps interface. Please refer to the documentation for the correct input format.",
        },
        target
      ),
      IRRELEVANT_REQUEST_DETAILS: selectInsturction(
        {
          button:
            "The request is not related to generating a JavaScript event listener function. Please provide a valid JSON input.",
          input:
            "The request is not related to generating a JavaScript event listener function for a DOM element (such as 'input' or 'button'). Please provide a valid JSON input.",
          form: "The provided prompt is not suitable for generating form elements. Please provide a prompt that describes the desired form structure and fields.",
        },
        target
      ),
    };
    handleInvalidIrrelevantInstruction = replacePlaceholders(
      handleInvalidIrrelevantInstruction,
      replacement
    );
    context.push(handleInvalidIrrelevantInstruction);
  }

  //   ** Args **//
  let accessArgsInstructions = importMarkdown(
    `${root}/accessArgsObject/access_args_object_instructions.md`
  );

  if (accessArgsInstructions) {
    const replacement = {};
    accessArgsInstructions = replacePlaceholders(
      accessArgsInstructions,
      replacement
    );
    context.push(accessArgsInstructions);
  }

  //   ** Database interaction keywords ** //

  if (keysIncludes(Keys.database)) {
    let databaseInteractionInstruction = importMarkdown(
      `${root}/databaseInteractionKeywords/database_interaction_keywords_instructions.md`
    );

    if (databaseInteractionInstruction) {
      const replacement = {
        ELEMENT_SPECIFIC_DATABASE_INSTRUCTIONS: selectInsturction(
          {
            button: "",
            form: "",
            input:
              dynamicInstructions.databaseInteractionInputSpecificInstructions,
          },
          target
        ),
      };
      databaseInteractionInstruction = replacePlaceholders(
        databaseInteractionInstruction,
        replacement
      );
      context.push(databaseInteractionInstruction);
    }
  }
  //   keys.forEach((key) => {
  //     const filePath = `${root}/${target}/${key}`;
  //     const content = importMarkdown(filePath);
  //     const updated = content?.replace(/button/gi, "Form") || null;
  //     context.push(updated);
  //   });
  fs.writeFile(
    `${process.cwd()}/instructions.md`,
    context.toString().replace(/,#/g, "\n#"),
    { encoding: "utf-8" },
    (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log("File written successfully.");
      }
    }
  );
}

const replaceText = (
  text: string,
  searchValue: string,
  replaceValue: string
): string => {
  if (!text || !searchValue) {
    return text; // Return original text if input is invalid
  }
  const regex = new RegExp(searchValue, "gi");
  return text.replace(regex, replaceValue);
};

function replacePlaceholders(
  text: string,
  replacements: { [key: string]: string }
): string {
  let modifiedText = text;
  for (const [placeholder, replacement] of Object.entries(replacements)) {
    modifiedText = replaceText(modifiedText, placeholder, replacement);
  }
  return modifiedText;
}

const selectInsturction = (
  options: { [key: string]: any },
  selectedKey: string
) => options[selectedKey];

function importMarkdown(filePath: string) {
  try {
    const markdownContent = fs.readFileSync(filePath, "utf8");
    return markdownContent;
  } catch (error) {
    console.error("Error importing Markdown:", error);
    return null;
  }
}
