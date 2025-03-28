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
  supportingPropsInstruction: {
    getInstruction: () => `- **\`supportingProps\`:**
  - Access utilities, variables and database info defined in \`supportingProps.utils\` , \`supportingProps.variables\`, and \`supportingProps.database\` using the \`args\` object.
  $- If a variable is referenced in the \`prompt\` or \`fieldDefinitions\` using a prefix like \`_myVariable\`, look up its value in \`supportingProps.variables\` and use \`args._myVariable\` in the generated code.
  - Similarly, use \`args.$myUtility\` for utilities referenced in the \`prompt\` or \`fieldDefinitions\` using a \`$\` prefix and obtained from \`supportingProps.utils\`.
  - **[DATABASE_ACCESS]**
        `,
  },
};

export default dynamicInstructions;
