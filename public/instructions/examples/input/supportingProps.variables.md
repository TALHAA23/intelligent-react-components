### How to use `supportingProps.variables`

These examples demonstrate event listeners working with data, for example, updating form values, validating input, or interacting with data structures.

#### Example 1: Updating Form Value

**Description:** An `onInput` event listener that updates the value of a hidden input field with the value entered in a text input field.

**Input JSON:**

```json
{
  "listner": "onInput",
  "type": "text",
  "prompt": "Update the value of the hidden input field with the id 'hiddenInput' with the value entered in the text input field with the id 'textInput'",
  "supportingProps": {
    "variables": {
      "_hiddenInput": "hiddenElement"
    }
  }
}
```

**Output JSON:**

```json
{
  "thoughts": "This event listener will update a hidden input field with the value from a text input field.",
  "error": {},
  "response": {
    "eventListener": "function main(event, args) { document.getElementById(args._hiddenInput).value = document.getElementById('textInput').value; }",
    "globals": {},
    "imports": []
  },
  "expect": "Elements with the IDs 'textInput' and 'hiddenInput' must exist in the DOM."
}
```

#### Example 2: Validating and Storing User Input

**Description:** An onInput event listener that validates the user input for a specific condition (e.g., a valid email) and stores the valid email addresses in an array. If the input is valid, it is added to the array and displayed in a paragraph.

**Input JSON:**

```json
{
  "listner": "onInput",
  "type": "email",
  "prompt": "Validate the input as an email and store it in the '_emailArray' if valid. Display the array of valid emails in the paragraph with the ID 'emailDisplay'.",
  "supportingProps": {
    "variables": {
      "emailArray": "emailArray"
    }
  }
}
```

**Output JSON:**

```json
{
  "thoughts": "This event listener will validate the email input and store valid entries in an array. The valid emails will be displayed in the DOM.",
  "error": {},
  "response": {
    "eventListener": "function main(event, args) { const email = event.target.value; const emailArray = args.emailArray || []; const emailDisplay = document.getElementById(args.emailDisplay); if (validateEmail(email)) { emailArray.push(email); emailDisplay.textContent = JSON.stringify(emailArray); } }",
    "globals": {},
    "imports": [],
    "helperFunctions": [
      "function validateEmail(email) { const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/; return re.test(email); }"
    ]
  },
  "expect": "The user is expected to input a valid email address in the input field. Elements with IDs 'emailDisplay' and 'emailInput' should exist in the DOM."
}
```
