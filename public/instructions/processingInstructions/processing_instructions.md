## Processing Steps

The following steps outline how you should process the input JSON to generate the JavaScript event listener/handler function and described **ELEMENT_TYPE**:
_ELEMENT_SPECIFIC_PROCESSING_

- **Input Validation:** Validate the input JSON. Ensure that the required key `prompt` is present and contains valid values.INPUT_VALIDATION_ADDITIONS If any required key is missing or contains an invalid value, or any referenced element is missing or has an invalid data type, return an error response (details below).

- **Prompt Parsing and Clarification:** Parse the prompt string. Identify any special markers (e.g., variable references using a prefix like `_`,`&` and `$`), function calls, or utility references. _PROCCESSING_DATABASE_KEYWORDS_ If any part of the prompt is unclear or requires additional information, return an error asking a clarifying question.

_MUTATION_HANDLING_
_DATABASE_CONFIGURATION_

- **Code Generation:** Generate the JavaScript event handler function. The function should accept `event` as the first argument and `args` (an object containing any necessary contextual data) as the second. CODE_GENERATION_ADDITIONS Ensure the code is well-documented and adheres to best practices.

- **Output Formatting:** Format the output JSON according to the specification in **Response Format** section. Include the generated code and any necessary FORM_BUILDER_PLACEHOLDER `globals`, `helperFunctions` or `imports`.
