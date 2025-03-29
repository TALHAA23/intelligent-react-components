import { InputKeys } from "../types/enum.js";
import { Element } from "../types/index.js";

const selectInstruction = (
  options: Record<Element, any>,
  selectedKey: Element
) => options[selectedKey];

const dynamicInstructions = {
  formSpecficInstruction: `
    Given a natural language description of the desired form, You can generate:
    
    - Form structures: Number of fields, arrangement, and overall layout.
    - Field definitions: Type, labels, placeholders, validation rules.
    - Styling: CSS classes or inline styles to achieve the desired visual appearance.
    `,
  databaseInteractionInputSpecificInstructions: `
    The following keywords in the prompt indicate database operations triggered by input elements and must be processed accordingly:
    
    - **fetch:** Represents retrieving data based on the input value. For example:
    
      - "Fetch user details where email matches the input value."
      - "Fetch product details by the entered product ID."
    
    - **insert:** Represents saving new data entered via the input field into the database. For example:
    
      - "Insert a new user with the name and email provided in the input fields."
      - "Insert a new record using the form input values for title and description."
    
    - **update:** Represents modifying existing data in the database based on the input value. For example:
    
      - "Update the user's phone number based on the value entered in the input field."
      - "Update the status of a task where the task ID matches the input value."
    
    - **delete:** Represents removing data based on the value entered in the input field. For example:
    
      - "Delete a user where the entered email matches an existing record."
      - "Delete a product record based on the ID entered in the input field."
    
    The examples are now tailored to scenarios where input elements directly trigger database interactions.
    `,
  mutationHandlingProccessingSteps: `- **Mutation Handling:** Process mutations from the mutation array. If the \`mutationType\` field is omitted for a mutation, assume that it's a callback function. Otherwise, handle assignment and callback types as described in the "Thought Process" section.
    `,
  databaseConfigProccessingSteps: `- **Database Configuration:** If the database field is present in \`supportingProps.database\`, use the \`name\` and \`envGuide\` fields to configure the database connection. The model should use the information to generate the code to connect to the specified database and handle any database operations mentioned in the prompt. The generated code should access environment variables using the information specified in \`envGuide\`.
    `,
  formDefinationProccessingSteps: `\n**Form Definition Processing:**
- **id:**
  - Process the id field and store it for later use in cross-field references.
  - Other field can refer to this field using \`@\` prefix .i.e @id-field.
  - The id can be refer into any field .i.e layout, styleHint, validate etc.
- **Layout:** Process the \`layout\` hint (e.g., "one-column", "two-column", "grid") to determine the overall form layout. Use this information to guide the arrangement of fields and the overall structure of the form. This will be a details prompt on how to arrange the form.
- **StyleHint:** Process the \`styleHint\` (e.g., "Material Design", "Bootstrap") to determine the desired visual style. Use this information to select appropriate CSS classes or generate inline styles.
- **Validation:** Process the \`validate\` instruction to determine any form-level validation rules.
- **Field Definitions:**
  - Iterate through each \`fieldDefination\` in the \`fieldDefinitions\` array.
  - Process the \`fieldDefination\` string to determine the field type, label, and other properties.
  - Process the \`styleHint\`, \`layout\`, and \`validate\` properties for each field to refine the field's appearance and behavior.
  - Process the \`step\` property to assign fields to the appropriate step in a multi-step form.
- **MultiStep:**
  - If the \`multiStep\` object is present, determine the number of steps and process the \`stepDescriptions\` to provide context for each step.
    `,
  supportingPropsInstruction: function (keys: string[]) {
    const haveUtils = keys.includes(InputKeys.utils);
    const haveVariables = keys.includes(InputKeys.variables);
    const haveDatabase = keys.includes(InputKeys.database);

    return `- **\`supportingProps\`:**
  - Access ${haveUtils ? "utils, " : ""}${haveVariables ? "variables, " : ""}${haveUtils && haveVariables ? "and " : ""}${haveDatabase ? "database " : ""}info defined in ${haveUtils ? "\`supportingProps.utils\`, " : ""}${haveVariables ? "\`supportingProps.variables\`, " : ""}${haveUtils && haveVariables ? "and" : ""}${haveDatabase ? "\`supportingProps.database\`" : ""} using the \`args\` object.
  ${haveUtils ? "- utils is referenced in the \`prompt\` using \`$_Dollor Sign\` prefix like \`$API\`, look up its value in \`supportingProps.utils\` and use \`args.$myVariable\` in the generated code. If reference is wrong or missing, response with error." : ""}
  ${haveVariables ? "- Variables is referenced in the \`prompt\` using \`_\` prefix like \`_myVariable\`, look up its value in \`supportingProps.variables\` and use \`args._myVariable\` in the generated code. If reference is wrong or missing, response with error." : ""}
  ${haveDatabase ? "- Database related info can be find in \`supportingProps.database\`, If the prompt require database operation this field must be defined. It must have a 'name' property with values like 'firebase database' to know what database to use and an optional 'envGuide' which tells how to access secrets. if envGuide is not provide use proccess.env to access variables." : ""}
  - If a variables is reference using the defined prefixes .i.e ${haveUtils ? "$" : ""} ${haveVariables ? "_" : ""} but the supportingProps have not prefix them that's ok accesss them without prefix using args like \`args.$var\` or \`args.var\` depends on how its defined in supportingProps
  `;
  },
  mutatationPropInstruction: `- **\`mutation\`:** The \`mutation\` field is an array of objects. Each object represents a mutation operation and includes an \`id\` field. The \`prompt\` might refer to these mutations using an \`&\` prefix followed by the \`id\` of the mutation. In the generated code, access the mutation using \`args.[mutationId]\`. Ensure that any needed parameters are passed correctly. The \`returnFormat\` indicates how the updated value should be used.\n  - If the \`mutation.mutationType\` field is omitted, or explicitly set to \`callback\`, assume the \`mutation.mutate\` property is a function that needs to be called.\n  - In most cases, mutations with an \`id\` that starts with "set" (e.g., "setValue", "setCount") are React state setter functions. If the prompt indicates a need to update the state based on its previous value, use the \`prevValue\` parameter within the state setter function when calling \`args.[mutationId]\`.
  `,
  callbacksPropInstruction: function (keys: string[]) {
    const haveInpendendentCallbacks = keys.includes(
      InputKeys.independentCallbacks
    );
    const haveDependentCallbacks = keys.includes(InputKeys.dependentCallbacks);
    const haveBoth = haveDependentCallbacks && haveInpendendentCallbacks;
    return `- **\`callbacks\`:** 
    The \`callbacks\` field contains ${haveInpendendentCallbacks ? "independent" : ""} ${haveBoth ? "and" : ""} ${haveDependentCallbacks ? "dependent" : ""} callbacks. To call any callback function, use the name provided in the \`callback\` field of each callback object. Access these callbacks through the \`args\` object as follows:
    - For all callbacks ${haveBoth ? "(both independent and dependent)" : ""}, use the exact string value found in the \`callback\` field as the key to access the function from the \`args\` object. For example, if a callback has \`callback: "processData"\`, you should call it as \`args.processData()\`
    - The \`callGuide\` field provides information about when to call the callback.
    ${haveDependentCallbacks ? "- For dependent callbacks, the \`parametersGuide\` array provides details about what parameters to pass to the callback function, with each array element corresponding to a parameter in the same order." : ""}
    `;
  },
  thoughtProccessInstructions: {
    inputValidationProcces: (target: Element, keys: string[]) => {
      const having = have(keys);
      const commonInstruction = `and any keys referenced within ${having.supportingProps ? "\`supportingProps\`, " : ""} ${having.mutation ? "\`mutation\`, " : ""} ${having.callbacks ? "\`callbacks\`" : ""} fields). Missing keys or invalid data types (e.g., wrong type, empty strings where strings are required) will trigger an immediate error response with specific details indicating the problem (e.g., "Missing key: supportingProps.variables.\_myVar", or "Invalid data type: listener should be a string"). This ensures that all necessary data for prompt interpretation exists before proceeding to the next steps.`;
      return selectInstruction(
        {
          button: `I rigorously check for the presence and validity of required keys (\`prompt\`, \`filename\`, ${commonInstruction}`,
          input: `I rigorously check for the presence and validity of required keys (\`prompt\`, \`type\`, \`filename\` ${commonInstruction}`,
          form: `I rigorously check for the presence and validity of required keys (\`prompt\`, \`filename\`). I ensure that the \`fieldDefinitions\` array is an array of objects and treat each index as a new field to be created. I check that each object within \`fieldDefinitions\` has the required keys (\`fieldDefination\`, and \`type\`). I return a specific error message for each validation failure (e.g., "Missing required key: 'prompt'", "Invalid data type for 'layout': expected string, received array").`,
        },
        target
      );
    },
    promptInterpretationProccess: (target: Element, keys: string[]) => {
      const having = have(keys);
      const commonInstruction = `Assuming successful input validation (step 1), I parse the \`prompt\` for special markers (${having.utils ? "\`$-DollarSign\`, " : ""} ${having.variables ? "\`_\`, " : ""} ${having.mutation ? "\`&\`" : ""}). ${having.variables ? "I handle variable references (\`_\`) using \`supportingProps.variables\`." : ""} ${having.utils ? "I handle utils (aliases prefix with $-DollarSign) using \`supportingProps.utils\`." : ""} ${having.mutation ? "mutations (\`&\`) from the \`mutation\` array" : ""}. Ambiguous phrases or other unexpected issues in the prompt will trigger clarifying error messages, requesting necessary information from the user. In this step, I focus on the correct interpretation of the _valid_ data, assuming that data validation has already been performed in step 1.`;
      return selectInstruction(
        {
          button: commonInstruction,
          input: commonInstruction,
          form:
            `I analyze the \`prompt\` to understand the overall form structure, desired field types, and any specific requirements (e.g., "Create a contact form", "Include a file upload field"). I extract information about the desired layout (e.g., "one-column", "two-column", "grid") from the \`prompt\` or the \`layout\` property. I identify any special instructions or constraints mentioned in the \`prompt\` (e.g., "Make the 'email' field required", "Include a placeholder for the 'name' field")` +
            commonInstruction,
        },
        target
      );
    },
  },
};

const have = (keys: string[]) => ({
  supportingProps: keys.includes(InputKeys.supportingProps),
  utils: keys.includes(InputKeys.utils),
  variables: keys.includes(InputKeys.variables),
  database: keys.includes(InputKeys.database),
  mutation: keys.includes(InputKeys.mutation),
  callbacks: keys.includes(InputKeys.callbacks),
  dependentCallbacks: keys.includes(InputKeys.dependentCallbacks),
  independentCallbacks: keys.includes(InputKeys.independentCallbacks),
});

export default dynamicInstructions;
