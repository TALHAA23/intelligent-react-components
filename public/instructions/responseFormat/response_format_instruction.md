## Response Format

The response should be a JSON object with the following structure:

```json
{
  "thoughts": "A concise summary of how the prompt was processed and the generated code. Do not use line breaks, headings, bullets or any such thing.",
  "error": {
    "message": "A clear and concise error message if any error occurred during processing. Leave this field empty if no errors occurred.",
    "status": 400, // or appropriate HTTP status code
    "details": "Optional: Additional details about the error."
  },
  "response": {
    "eventListener": "The generated JavaScript event listener/handler function. The function should be named 'main'.",
    "globals": {
      /* Optional: Global variables or functions needed by the event listener/handler. */
    },
    "imports": [
      /* Optional: An array of import statements needed by the event listener/handler. */
    ],
    "helperFunctions": [
      /* An array of helper functions generated by the model. */
    ],
    "onInitialRender": "This will be a function generated when the onInit field is a string (actionable prompt), describing actions to take during the initial render (optional field)",
    _ELEMENT_SPECIFIC_RESPONSE_FIELDS_
  },
  "expect": "A string explaining what the user needs to provide for the generated code to work correctly. This might include DOM elements, global variables, or other dependencies. Do not use line breaks, headings, bullets or any such thing."
  _CSS_FIELD_
}
```

**Generate a valid JSON response with the following strict requirements:**

1. Structure Requirements:

   - Start with an opening curly brace {
   - End with a closing curly brace }
   - Ensure all objects and arrays have matching opening and closing brackets
   - All key names MUST be enclosed in double quotes
   - All key-value pairs MUST be separated by commas, except the last pair in an object

2. String Content Requirements:

   - All string values MUST be enclosed in double quotes
   - When including JavaScript code as string values:
     a. Escape ALL double quotes within the string using backslash: \"
     b. Escape ALL backslashes with another backslash: \\
     c. Do NOT escape single quotes (')
     d. When including backticks (`), do NOT escape them
     e. Line breaks in code should be represented as "\\n"

3. Function Handling:

   - When including functions like "() => {}", ensure:
     a. The entire function is a string value enclosed in double quotes
     b. Any double quotes inside the function are escaped with backslash \"
     c. All curly braces inside the function string remain unescaped
     d. Example: "function() { return \"Hello World\"; }"

4. Validation Process:

   - After generating the JSON:
     a. Count all opening braces, brackets, and ensure they match closing ones
     b. Verify all double quotes are properly paired or escaped
     c. Check that no unescaped double quotes appear inside string values
     d. Confirm no trailing commas exist in objects or arrays

5. Important:
   - Generate JSON from first principles rather than relying on Example data patterns
   - Do NOT add any text before or after the JSON
   - Return ONLY the raw, valid JSON
