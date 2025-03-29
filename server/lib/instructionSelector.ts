import fs from "fs";
import path from "path";
import { type Element } from "../types";
import { InputKeys } from "../types/enum.js";
import dynamicInstructions from "./dynamicInstructions.js";
import { format } from "prettier";

export default async function instructionHandler(
  target: Element,
  keys: string[],
  prompt: string
) {
  const root = path.resolve(
    import.meta.dirname,
    "../../../public/instructions"
  );
  const context: (string | null)[] = [];
  const haveDatabaseInteraction = detectsFirebaseSupabaseInteraction(prompt);
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
      ELEMENT_SPECIFIC_REQUIRED_KEYS: selectInstruction(
        {
          button: "",
          input:
            '- `"type"`: A string representing the input type (e.g., `"text"`, `"password"`, `"email"`, etc.). This key helps the model generate code tailored to the specific input type',
          form: "",
        },
        target
      ),
      ELEMENT_SPECIFIC_OPTIONAL_KEYS: selectInstruction(
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
      _PROCCESSING_DATABASE_KEYWORDS_: keysIncludes(InputKeys.database)
        ? "Identify keywords indicating database operations (e.g., fetch, insert, update, delete)"
        : "",
      _MUTATION_HANDLING_: keysIncludes(InputKeys.mutation)
        ? dynamicInstructions.mutationHandlingProccessingSteps
        : "",
      _DATABASE_CONFIGURATION_: keysIncludes(InputKeys.database)
        ? dynamicInstructions.databaseConfigProccessingSteps
        : "",
      _ELEMENT_SPECIFIC_PROCESSING_: keysIncludes(InputKeys.supportingProps)
        ? dynamicInstructions.formDefinationProccessingSteps
        : "",
    };
    proccessingInstructions = replacePlaceholders(
      proccessingInstructions,
      replacement
    );
    context.push(proccessingInstructions);
  }

  // ** collect thought process instructions ** //
  let thoughtProccessInstruction = importMarkdown(
    `${root}/thoughtProcess/thought_process_instructions.md`
  );
  if (thoughtProccessInstruction) {
    const replacement = {
      _INPUT_VALIDATION_PROCESS_:
        dynamicInstructions.thoughtProccessInstructions.inputValidationProcces(
          target,
          keys
        ),
      _PROMPT_INTERPRETATION_PROCESS_:
        dynamicInstructions.thoughtProccessInstructions.promptInterpretationProccess(
          target,
          keys
        ),
      _CALLBACK_HANDLING_: keysIncludes(InputKeys.callbacks)
        ? dynamicInstructions.thoughtProccessInstructions.callbacks(keys)
        : "",
      _MUTATION_HANDLING_: keysIncludes(InputKeys.mutation)
        ? dynamicInstructions.thoughtProccessInstructions.mutationInstruction
        : "",
      _CODE_GENERATION_LOGIC_:
        dynamicInstructions.thoughtProccessInstructions.codeGeneration(target),
      _ON_INIT_PROCESSING_: keysIncludes(InputKeys.onInitialRender)
        ? dynamicInstructions.thoughtProccessInstructions.onInitialRender
        : "",
      _DATABASE_INTERACTION_:
        haveDatabaseInteraction || keysIncludes(InputKeys.database)
          ? dynamicInstructions.thoughtProccessInstructions.databaseInteraction
          : "",
      _CSS_CONSIDERATIONS_:
        target == "form"
          ? dynamicInstructions.thoughtProccessInstructions.cssRules
          : "",
      _FIELD_DEFINITION_PROCESSING_:
        target == "form"
          ? dynamicInstructions.thoughtProccessInstructions.fieldDefination
          : "",
      _FORM_BUILDER_FUNCTION_:
        target == "form"
          ? dynamicInstructions.thoughtProccessInstructions.formBuilder
          : "",
      _RESPONSIVENESS_CONSIDERATIONS_:
        target == "form"
          ? dynamicInstructions.thoughtProccessInstructions.responsivness
          : "",
      _ACCESSIBILITY_CONSIDERATIONS_:
        target == "form"
          ? dynamicInstructions.thoughtProccessInstructions.accessibility
          : "",
    };
    thoughtProccessInstruction = replacePlaceholders(
      thoughtProccessInstruction,
      replacement
    );
    context.push(thoughtProccessInstruction);
  }

  // ** Response Format Instruction **//
  let responseFormatInstruction = importMarkdown(
    `${root}/responseFormat/response_format_instruction.md`
  );

  if (responseFormatInstruction) {
    const replacement = {
      _ELEMENT_SPECIFIC_RESPONSE_FIELDS_:
        target == "form"
          ? '"formBuilder": "This function contains the logic to create the form structure, including all fields, labels, and buttons. Always use globals field keep reference of field created so that the eventListener function can always refer to the field require in handler. To generate a function for this field analyze the prompt, layout, styleHint, fieldDefinitions and multiStep field to understand what need to be created"'
          : "",
      _CSS_FIELD_:
        target == "form"
          ? ',"CSS": "This field holds CSS styling for the generated form elements. **Always prefix CSS classes and IDs with the `filename` provided in the input JSON.** This prevents style conflicts and improves maintainability. Nevr use element name to style to avoid global styling."'
          : "",
    };
    responseFormatInstruction = replacePlaceholders(
      responseFormatInstruction,
      replacement
    );
    context.push(responseFormatInstruction);
  }

  // ** collect globals object instruction ** //
  let globalsObjInstruction = importMarkdown(
    `${root}/globals/globals_instructions.md`
  );

  if (globalsObjInstruction) {
    const replacements = {
      GLOBAL_VARIABLE_EXAMPLE_KEY: selectInstruction(
        {
          input: "isValid",
          button: "numberofClick",
          form: "isSubmitting",
        },
        target
      ),
      GLOBAL_VARIABLE_EXAMPLE_VALUE: selectInstruction(
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
      INTERACTION_TYPE: selectInstruction(
        {
          button: "click, or any mouse event",
          input: "input, change or any input related event",
          form: "submit, or any form related event",
        },
        target
      ),
      ELEMENT_SPECIFIC_INSTRUCTIONS: selectInstruction(
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
      MISSING_KEYS_DETAILS: selectInstruction(
        {
          button: "The following keys are missing: listener, prompt.",
          input: "The following keys are missing: listener, prompt, or type.",
          form: "The input is not valid JSON or does not conform to the expected AIFormProps interface. Please refer to the documentation for the correct input format.",
        },
        target
      ),
      INVALID_DATA_TYPE_DETAILS: selectInstruction(
        {
          button:
            "The 'prompt' field should be a string, but a number was provided.",
          input:
            "The request is not related to generating a JavaScript event listener function for a DOM element (such as 'input' or 'button'). Please provide a valid JSON input.",
          form: "The input is not valid JSON or does not conform to the expected AIFormProps interface. Please refer to the documentation for the correct input format.",
        },
        target
      ),
      IRRELEVANT_REQUEST_DETAILS: selectInstruction(
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
    const replacement = {
      _SUPPORTING_PROPS_ACCESS_: keysIncludes(InputKeys.supportingProps)
        ? dynamicInstructions.supportingPropsInstruction(keys)
        : "",
      _MUTATION_ACCESS_: keysIncludes(InputKeys.mutation)
        ? dynamicInstructions.mutatationPropInstruction
        : "",
      _CALLBACKS_ACCESS_: keysIncludes(InputKeys.callbacks)
        ? dynamicInstructions.callbacksPropInstruction(keys)
        : "",
    };

    accessArgsInstructions = replacePlaceholders(
      accessArgsInstructions,
      replacement
    );
    context.push(accessArgsInstructions);
  }

  //   ** Database interaction keywords ** //

  if (keysIncludes(InputKeys.database)) {
    let databaseInteractionInstruction = importMarkdown(
      `${root}/databaseInteractionKeywords/database_interaction_keywords_instructions.md`
    );

    if (databaseInteractionInstruction) {
      const replacement = {
        ELEMENT_SPECIFIC_DATABASE_INSTRUCTIONS: selectInstruction(
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

  // ** Additionals ** //
  const additionalInstructions = importMarkdown(
    `${root}/additionals/${target}.md`
  );
  if (additionalInstructions) {
    context.push(additionalInstructions);
  }

  // ** Collect Example Data ** //
  // example desc

  const examplesDescription = importMarkdown(
    `${root}/examples/examples_description.md`
  );
  if (examplesDescription) {
    context.push(examplesDescription);
  }

  //   keys.forEach((key) => {
  //     const filePath = `${root}/${target}/${key}`;
  //     const content = importMarkdown(filePath);
  //     const updated = content?.replace(/button/gi, "Form") || null;
  //     context.push(updated);
  //   });
  const formatInstruction = await format(
    context.toString().replace(/,#/g, "\n#"),
    {
      parser: "markdown",
    }
  );
  fs.writeFile(
    `${process.cwd()}/instructions.md`,
    formatInstruction,
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

const selectInstruction = (
  options: Record<Element, any>,
  selectedKey: Element
) => options[selectedKey];

const detectsFirebaseSupabaseInteraction = (text: string) => {
  // Regular expressions to detect Firebase and Supabase interaction keywords and patterns.
  const firebaseSupabaseRegex =
    /(firebase|supabase|firestore|realtime database|auth|storage|functions|collections|documents|tables|rows|columns|queries|insert|update|delete|select|from|where|order by|limit|onSnapshot|getDocs|addDoc|setDoc|updateDoc|deleteDoc|from|to|eq|gt|lt|gte|lte|in|not|is|isNot|like|rpc|storage.from|storage.upload|storage.download)/i;

  return firebaseSupabaseRegex.test(text);
};

function detectsDOMManipulationPrompt(text: string) {
  // Regular expressions to detect DOM manipulation keywords and patterns in a prompt context.
  const domPromptRegex =
    /(modify the DOM|change the DOM|update the DOM|add element|remove element|create element|manipulate element|access element|get element|set attribute|get attribute|remove attribute|event listener|event handler|append child|remove child|insert before|replace child|style element|class list|query selector|get element by id|element|node|DOM|HTML element|HTML node|javascript element|javascript node|dynamic element|dynamic node|visual element|visual node|web element|web node|\.innerHTML|\.textContent|\.style|\.classList|\.setAttribute|\.getAttribute|\.removeAttribute|\.value|\.src|\.href|dynamic content|interactive element|interactive component|web interaction|user interface element|UI element)/i;

  // Check if the text matches any of the DOM manipulation patterns.
  return domPromptRegex.test(text);
}

function importMarkdown(filePath: string) {
  try {
    const markdownContent = fs.readFileSync(filePath, "utf8");
    return markdownContent;
  } catch (error) {
    console.error("Error importing Markdown:", error);
    return null;
  }
}
