import fs from "fs";
import path from "path";
import { Common, type Element } from "../types";
import { InputKeys } from "../types/enum.js";
import dynamicInstructions from "./dynamicInstructions.js";
import { format } from "prettier";
import getAllKeys from "../utils/getObjectKeys.js";

export default async function instructionHandler(props: Common) {
  const { element: target } = props;
  if (!target) {
    throw new Error(target + "is not a valid element.");
  }
  const keys = getAllKeys(props);
  const root = path.resolve(
    import.meta.dirname,
    "../../../public/instructions"
  );
  const context: (string | null)[] = [];
  const haveDatabaseInteraction = detectsFirebaseSupabaseInteraction(
    props.prompt
  );
  const keysIncludes = (key: string) => keys.includes(key);

  // **  collect general instrucitions ** //
  let generalInstructions = importMarkdown(`${root}/general_instruction.md`);

  if (generalInstructions) {
    const replacements: { [key: string]: string } = {
      ELEMENT_TYPE: target.toUpperCase(),
      _FORM_SPECEFIC_INSTRUCTION_:
        target == "form" ? dynamicInstructions.formSpecficInstruction : "",
    };

    generalInstructions = replacePlaceholders(
      generalInstructions,
      replacements
    );

    context.push(generalInstructions);
  }
  // ** Collect expected Input instructions ** //
  let expectedInputInstruction = importMarkdown(
    `${root}/expectedInput/expected_input_instructions.md`
  );
  if (expectedInputInstruction) {
    const replacement = {
      ELEMENT_TYPE: target.toUpperCase(),
      ELEMENT_SPECIFIC_REQUIRED_KEYS:
        target == "input"
          ? '- `"type"`: A string representing the input type (e.g., `"text"`, `"password"`, `"email"`, etc.). This key helps the model generate code tailored to the specific input type'
          : "",
      _OPTIONAL_KEYS_: dynamicInstructions.expectedInputInstruction(keys),
      _FEEDBACK_FIELD_USEAGE_: keysIncludes(InputKeys.feedback)
        ? dynamicInstructions.feedbackInstruction
        : "",
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
      _ELEMENT_SPECIFIC_PROCESSING_:
        target == "form"
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
      ELEMENT_SPECIFIC_INSTRUCTIONS:
        target == "form"
          ? "7. **Handle Dynamic Content:** If the form needs to dynamically add or remove elements (e.g., adding new fields based on user input), the model should implement this logic carefully to avoid creating duplicate elements."
          : "",
    };
    preventDuplicateDomElementInstructions = replacePlaceholders(
      preventDuplicateDomElementInstructions,
      replacement
    );
    context.push(preventDuplicateDomElementInstructions);
  }
  //   ** Collect instruction to handle invalid-irrelevant requests ** //
  // let handleInvalidIrrelevantInstruction = importMarkdown(
  //   `${root}/handleInvalidIrrelevantRequests/handle_invalid_irrelevant_requests_instruction.md`
  // );

  // if (handleInvalidIrrelevantInstruction) {
  //   const replacement = {
  //     ELEMENT_TYPE: target.toUpperCase(),
  //     MISSING_KEYS_DETAILS: selectInstruction(
  //       {
  //         button: "The following keys are missing: listener, prompt.",
  //         input: "The following keys are missing: listener, prompt, or type.",
  //         form: "The input is not valid JSON or does not conform to the expected AIFormProps interface. Please refer to the documentation for the correct input format.",
  //       },
  //       target
  //     ),
  //     INVALID_DATA_TYPE_DETAILS: selectInstruction(
  //       {
  //         button:
  //           "The 'prompt' field should be a string, but a number was provided.",
  //         input:
  //           "The request is not related to generating a JavaScript event listener function for a DOM element (such as 'input' or 'button'). Please provide a valid JSON input.",
  //         form: "The input is not valid JSON or does not conform to the expected AIFormProps interface. Please refer to the documentation for the correct input format.",
  //       },
  //       target
  //     ),
  //     IRRELEVANT_REQUEST_DETAILS: selectInstruction(
  //       {
  //         button:
  //           "The request is not related to generating a JavaScript event listener function. Please provide a valid JSON input.",
  //         input:
  //           "The request is not related to generating a JavaScript event listener function for a DOM element (such as 'input' or 'button'). Please provide a valid JSON input.",
  //         form: "The provided prompt is not suitable for generating form elements. Please provide a prompt that describes the desired form structure and fields.",
  //       },
  //       target
  //     ),
  //   };
  //   handleInvalidIrrelevantInstruction = replacePlaceholders(
  //     handleInvalidIrrelevantInstruction,
  //     replacement
  //   );
  //   context.push(handleInvalidIrrelevantInstruction);
  // }

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
  [
    detectsDOMManipulationPrompt(props.prompt),
    extractDatabaseName(
      props.supportingProps?.database?.name,
      "common_databaseOperation"
    ),
    extractFirebaseSupabaseCRUD(props.prompt, "common_crud"),
    extractFirebaseSupabaseStorage(props.prompt),
    extractFirebaseSupabaseAuth(props.prompt, "common_auth"),
    "usage_general_example",
    extractFirebaseSupabaseCRUD(props.prompt, "usage.example"),
    extractFirebaseSupabaseAuth(props.prompt, "usage.auth"),
  ].forEach((item) => {
    if (item) {
      keys.push(item);
    }
  });
  // Collecting examples
  keys.forEach((key) => {
    if (key == "onInit" && typeof props.onInit !== "string") return;
    const examplePath = key.startsWith("common_")
      ? `${root}/examples/common/${key}.md`
      : key.startsWith("usage")
        ? `${root}/examples/${target}/usage/${key}.md`
        : `${root}/examples/${target}/${key}.md`;
    const content = importMarkdown(examplePath);
    if (typeof content !== "undefined" && content !== null) {
      context.push(content);
    }
  });
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
  return formatInstruction;
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

function detectsFirebaseSupabaseInteraction(text: string) {
  const firebaseSupabaseRegex =
    /(firebase|supabase|firestore|realtime database|auth|storage|functions|collections|documents|tables|rows|columns|queries|insert|update|delete|select|from|where|order by|limit|onSnapshot|getDocs|addDoc|setDoc|updateDoc|deleteDoc|from|to|eq|gt|lt|gte|lte|in|not|is|isNot|like|rpc|storage.from|storage.upload|storage.download)/i;
  return firebaseSupabaseRegex.test(text);
}
function extractFirebaseSupabaseCRUD(text: string, prefix: string) {
  const firebaseRegex = /firebase/i;
  const supabaseRegex = /supabase/i;
  const crudRegex =
    /(create|read|update|delete|insert|select|modify|remove|add|get|put|patch|del|fetch|retrieve|persist|store|save|change|alter|form|submit|post|patch|delete|put)/i;

  if (crudRegex.test(text)) {
    if (firebaseRegex.test(text)) {
      return `${prefix}.firebase`;
    } else if (supabaseRegex.test(text)) {
      return `${prefix}.supabase`;
    }
  }
}
function extractFirebaseSupabaseStorage(text: string) {
  const firebaseStorageRegex = /firebase storage/i;
  const supabaseStorageRegex = /supabase storage/i;
  const storageOperationRegex =
    /(download|upload|download|store|retrieve|file|cloud|object|bucket|path|url|location|service|store data|retrieve data|blob)/i;

  if (storageOperationRegex.test(text)) {
    if (firebaseStorageRegex.test(text)) {
      return "common_storage.firebase";
    } else if (supabaseStorageRegex.test(text)) {
      return "common_storage.supabase";
    }
  }

  return null;
}
function extractFirebaseSupabaseAuth(text: string, prefix: string) {
  const firebaseRegex = /firebase/i;
  const supabaseRegex = /supabase/i;
  const authRegex =
    /(auth|authentication|login|signup|register|sign in|sign up|create user|get user|verify user|reset password|forgot password|user management|access control|authorization|jwt|token|session|user authentication|user authorization|sign out|logout|password reset|email verification|user credentials)/i;

  if (authRegex.test(text)) {
    if (firebaseRegex.test(text)) {
      return `${prefix}.firebase`;
    } else if (supabaseRegex.test(text)) {
      return `${prefix}.supabase`;
    }
  }

  return null;
}

function extractDatabaseName(text: string = "", prefix: string) {
  const firebaseRegex = /firebase/i;
  const supabaseRegex = /supabase/i;
  if (firebaseRegex.test(text)) {
    return `${prefix}.firebase"`;
  } else if (supabaseRegex.test(text)) {
    return `${prefix}.supabase`;
  }
  return null;
}
function detectsDOMManipulationPrompt(text: string) {
  // Regular expressions to detect DOM manipulation keywords and patterns in a prompt context.
  const domPromptRegex =
    /(DOM|modify the DOM|change the DOM|update the DOM|add element|remove element|create element|manipulate element|access element|get element|set attribute|get attribute|remove attribute|event listener|event handler|append child|remove child|insert before|replace child|style element|class list|query selector|get element by id|element|node|DOM|HTML element|HTML node|javascript element|javascript node|dynamic element|dynamic node|visual element|visual node|web element|web node|\.innerHTML|\.textContent|\.style|\.classList|\.setAttribute|\.getAttribute|\.removeAttribute|\.value|\.src|\.href|dynamic content|interactive element|interactive component|web interaction|user interface element|UI element)/i;

  // Check if the text matches any of the DOM manipulation patterns.
  return domPromptRegex.test(text) ? InputKeys.domManipulatiion : "";
}

function importMarkdown(filePath: string) {
  try {
    const markdownContent = fs.readFileSync(filePath, "utf8");
    return markdownContent;
  } catch (error) {
    error;
    return null;
  }
}
