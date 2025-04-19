import { InputKeys } from "../types/enum.js";
import { Element } from "../types/index.js";

const selectInstruction = (
  options: Record<Element, any>,
  selectedKey: Element
) => options[selectedKey];

const dynamicInstructions: { [key: string]: any } = {
  formSpecficInstruction: `Given a natural language description of the desired form, You can generate:
  - Form structures: Number of fields, arrangement, and overall layout.
  - Field definitions: Type, labels, placeholders, validation rules.
  - Styling: CSS classes or inline styles to achieve the desired visual appearance.`,
  expectedInputInstruction: (keys: string[]) => {
    const having = have(keys);
    if (keys.length <= 4) return "";
    return `**Optional Keys:** The following keys are optional but may be included to provide additional context:
    ${having.supportingProps ? '- \`"supportingProps"\`: An object containing \`variables\`, \`utils\`, and \`database\` accessible within the \`prompt\`.' : ""}
    ${having.mutation ? '- \`"mutations"\`: An array of objects, each describing a mutation operation to be performed within the generated functions. Each mutation object should have an \`id\`, \`returnFormat\`, and \`mutate\` field.' : ""}
    ${having.callbacks ? '- \`"callbacks"\`: An object containing independent and dependent callbacks. See the "Callbacks" section for details.' : ""}
    ${having.onInit ? '- \`"onInit"\`: A string defining initialization logic for the **ELEMENT_TYPE** element, executed on the first render.' : ""}
    ${having.layout ? '- \`"layout"\`: Hints for the desired form layout (e.g., \`"one-column"\`, \`"two-column"\`, \`"grid"\`).\n' : ""}
    ${having.styleHint ? '- \`"styleHint"\`: Guidelines for the visual style of the form (e.g., \`"Material Design"\`, \`"Bootstrap"\`). \n' : ""}
    ${having.validate ? '- \`"validate"\`: Instructions for form validation.\n' : ""}
    ${having.fieldDefinations ? '- \`"fieldDefinitions"\`: An array of objects defining individual form fields.\n' : ""}
    ${having.multiStep ? '- \`"multiStep"\`: Configuration for multi-step forms.' : ""}
    `;
  },
  formFieldDefinationTypePropertyInstruction: `- Within each object in the \`"fieldDefinitions"\` array, the \`type\` property specifies the kind of form element. The model should interpret the \`type\` property as follows:
  - **Standard HTML Input Types:** If \`type\` is a standard HTML input type (e.g., \`"text"\`, \`"password"\`, \`"email"\`, \`"number"\`), generate a corresponding \`<input>\` element with that \`type\`.

  - **Custom Type: \`"radio-group"\`:** If \`type\` is \`"radio-group"\`, generate radio buttons using the \`options\` array for labels/values. \`name\` is shared.
    "type": "radio-group"
    <div><label>Choose</label><div><input type="radio" id="CONTEXTED_BASED" name="NAME_BASED_ON_CONTEXT" value="Yes"><label for="CONTEXTED_BASED">Yes</label></div><div><input type="radio" id="CONTEXTED_BASED" name="NAME_BASED_ON_CONTEXT" value="No"><label for="CONTEXTED_BASED">No</label></div></div>
    
  - **Custom Type: \`"drop-down"\` (Select Element):** If \`type\` is \`"drop-down"\`, generate a \`<select>\` with \`<option>\` from the \`options\` array.
    "type": "drop-down"
    <label for="selection">Pick</label><select id="selection" name="selection"><option value="">Select...</option><option value="a">Alpha</option></select>
  - So on for type \`checkbox-group\` and \`textarea\`
  
  *Each element in fieldDefinations have "fieldDefination" which is like a desc of the element use it to understand about the element.*
  `,
  feedbackInstruction: `**Feedback Usage:**
  - If \`feedback\` is present, prioritize processing it and revising the response.
  - \`feedback\` should describe errors, required changes, and constraints.
  - Aim to correct errors, implement changes, and maintain consistency.
  - If \`feedback\` is absent, process the request as new.
  - Latest conversation will most probably present at last 2 indexes in \`history\` of model but it is not promised.
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
  ${haveUtils ? "- utils is referenced in the \`prompt\` using \`$_Dollor Sign\` prefix like \`$API\`, look up its value in \`supportingProps.utils\` and use \`args.$[KEY]\` in the generated code. If reference is wrong or missing, response with error." : ""}
  ${haveVariables ? "- Variables is referenced in the \`prompt\` using \`_\` prefix like \`_myVariable\`, look up its value in \`supportingProps.variables\` and use \`args._[KEY]\` in the generated code. If reference is wrong or missing, response with error." : ""}
  ${haveDatabase ? "- Database related info can be find in \`supportingProps.database\`, If the prompt require database operation this field must be defined. It must have a 'name' property with values like 'firebase database' to know what database to use and an optional 'envGuide' which tells how to access secrets. if envGuide is not provide use proccess.env to access variables." : ""}
  - If a variables is reference using the defined prefixes .i.e ${haveUtils ? "$" : ""} ${haveVariables ? "_" : ""} but the supportingProps have not prefix then that's ok accesss them without prefix using args like \`args.$[KEY]\` or \`args.[KEY]\` depends on how its defined in supportingProps
  `;
  },
  mutatationPropInstruction: `- **\`mutation\`:** The \`mutation\` field is an array of objects. Each object represents a mutation operation and includes an \`id\` field. The \`prompt\` might refer to these mutations using an \`&\` prefix followed by the \`id\` of the mutation. In the generated code, access the mutation using \`args.[mutationId]\`. Ensure that any needed parameters are passed correctly. The \`returnFormat\` tell in which format the value should be structured before mutation.\n  - If the \`mutation.mutationType\` field is omitted, or explicitly set to \`callback\`, assume the \`mutation.mutate\` property is a function that needs to be called.\n  - In most cases, mutations with an \`id\` that starts with "set" (e.g., "setValue", "setCount") are React state setter functions. If the prompt indicates a need to update the state based on its previous value, use the \`prevValue\` parameter within the state setter function when calling \`args.[mutationId]\`.
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
    mutationInstruction: `- **Mutation:** I process mutations from the \`mutation\` array. I handle different mutation types as follows:

  - **\`assignment\`:** If \`mutationType\` is "assignment," I directly assign the value to the corresponding variable in the \`args\` object using the assignment operator (\`=\`).

  - **\`callback\`:** If \`mutationType\` is "callback" (or omitted), I invoke the corresponding function in the \`args\` object, passing the appropriate value as the argument. If \`mutationType\` is missing, I assume it is a callback.

  - **\`React State Setter\`:** If the mutation \`id\` starts with "set" (e.g., "setValue", "setCount"), I treat it as a React state setter function. If the prompt indicates a need to update the state based on its previous value, I use the \`prevValue\` parameter within the state setter function when calling \`args.[mutationId]\`.
    `,
    codeGeneration: (target: Element) => {
      const commenInstruction = `I generate the \`main\` function, ensuring that it includes appropriate error handling for potential runtime issues. The function arguments (\`event\`, \`args\`) are strictly enforced.`;
      return selectInstruction(
        {
          button: commenInstruction,
          input: commenInstruction,
          form:
            commenInstruction +
            ` Additionally, I generate the \`formBuilder\` function when the prompt requires creating form fields or when the \`fieldDefinitions\` array is defined. The \`formBuilder\` function takes \`target\` (the form element) and \`args\` as parameters. I will create form fields and append them to the \`target\` form element, rather than creating a new form.`,
        },
        target
      );
    },
    callbacks: (keys: string[]) => {
      const having = have(keys);
      const haveBoth = having.dependentCallbacks && having.independentCallbacks;
      return `- **Callbacks:** I process callbacks ${haveBoth ? "(both independent and dependent callbacks)" : ""} from the \`callbacks\` field. Missing or invalid callback names ${having.dependentCallbacks ? ", or insufficient parameters for dependent callbacks," : ""} will result in specific error messages.`;
    },
    onInitialRender: `- If the onInit field is defined as a string, I generate an onInitialRender function containing the initialization logic described by the \`onInit\`. This function is executed during the first render and the function arguments (\`target\`, \`args\`) are strictly enforced. If the description in \`onInit\` is unclear or ambiguous, I request clarifications. If \`onInit\` is a function or undefined, I ignore it entirely, as the user will handle initialization logic manually.`,
    databaseInteraction: `- If the prompt contains keywords indicating database operations (fetch, insert, update, delete), I will generate the necessary database interaction code based on these keywords and the provided context (database name, connection details, etc.). I will handle potential errors appropriately. **If the prompt indicates a database operation but the \`supportingProps.database.name\` field is missing or empty, I will return an error indicating that the database type must be specified.** I will, by default, cache the response from \`fetch\` operations using the \`globals\` object and use this cached data in subsequent calls to avoid redundant database queries. **The cached data will be used until the user explicitly tells me not to use the cached response by adding a phrase like "Do not cache the response" in the prompt.**`,
    cssRules: `- I do not generate inline CSS styles within the code. I provide a CSS code in the \`"CSS"\` section of the response. I emphasize the use of class-based styling and proper ID usage to avoid style conflicts and improve maintainability. I always prefix classes and id with filename of the input JSON to avoid conflict. If the user want to use styling library like tailwind CSS I use that over traditional CSS.`,
    accessibility: `- I strive to generate forms that are accessible to users with disabilities. This includes ensuring proper ARIA attributes are applied to form elements (e.g., \`aria-label\`, \`aria-describedby\`). I consider color contrast and other accessibility guidelines when determining appropriate styling.`,
    responsivness: `- I consider how the generated form will adapt to different screen sizes. I will use CSS media queries to adjust the layout and styling for different screen widths.`,
    formBuilder: `- The \`formBuilder\` function is responsible for dynamically creating the HTML structure of the form. I analyze the \`prompt\`, \`layout\`, \`styleHint\`, and \`fieldDefinitions\` to determine: The number and types of input fields required. The arrangement of fields within the form (e.g., one column, two columns, grid). The labels for each input field. The HTML attributes for each input field (type, placeholder, required, etc.). I create the necessary HTML elements (input fields, labels, buttons, containers) and assign them appropriate IDs and classes (following the naming conventions). I apply the specified \`styleHint\` to the form elements by adding CSS classes and generating the style in the CSS field of the Output JSON. I append the created elements to the appropriate parent elements within the form structure. I ensure that the generated form structure adheres to the specified \`layout\` and \`styleHint\`. I handle conditional logic within the form (if specified in the \`prompt\` or \`fieldDefinitions\`).`,
    fieldDefination: `- I iterate through each object in the \`fieldDefinitions\` array. I extract the \`id\`, \`fieldDefination\`, \`styleHint\`, \`layout\`, \`type\`, and \`validate\` properties for each field. I analyze the \`fieldDefination\` string to determine the field nature and need. I check \`type\` to know the type of input (e.g., "text", "number", "textarea", "select", "checkbox", "file"). I identify any validation rules specified in the \`validate\` property (e.g., "required", "email format", "number range") or create any validation function in the \`helperFunctions\`. I handle field references (e.g., "The value should be same as @password") by storing the \`id\` of the referenced field and using it during code generation.`,
  },
  formAdditionalInstructions: (keys: string[]) => {
    const having = have(keys);
    const multiStepFormInstruction = `## MultiStep Form Suggestions
    - Do Not Use addEventListener .i.e addEventlistener element.addEventlistener("click", () =>{}) instead pass onClick property within createElement to attached handler .i.e createElement("element", { onClick:()=> {} } )
    - For a multiStep form with Prev, Next, Submit (more than one button) I create a wrapper with flex property and use flex-grow:1 on each button. For samller screen I use columns diraction while for bigger I use row.
    - As The navigation button require a listener I always add a listner using createElement helperFunction, for example:
      globals.nextButton = createElement("button", {
        type: "button",
        textContent: "Next",
        className: \`FILENAME-button FILENAME-next-button [DOLLORS_IGN]{globals.currentStep === stepsData.length ? "FILENAME-hidden" : ""}\`,
        onclick: () => showStep(globals.currentStep + 1),
      });
    `;
    return `${having.multiStep && multiStepFormInstruction}`;
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
  onInit: keys.includes(InputKeys.onInitialRender),
  layout: keys.includes(InputKeys.layout),
  styleHint: keys.includes(InputKeys.styleHint),
  validate: keys.includes(InputKeys.validate),
  multiStep: keys.includes(InputKeys.multiStep),
  fieldDefinations: keys.includes(InputKeys.fieldDefinations),
});

export default dynamicInstructions;
