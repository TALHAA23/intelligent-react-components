### How to use `supportingProps.utils`

This subsection shows how to use utils as aliases from `supportingProps.utils`.

### Example 1: Using utils for Dynamic Validation Message

**Description:** This example demonstrates using a util to dynamically select an error message based on input field validation.

**Input JSON:**

```json
{
  "listner": "input",
  "type": "text",
  "prompt": "Display an error message on console if the input value of email does not match the regular expression '$emailPattern'",
  "supportingProps": {
    "utils": {
      "$emailPattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
    }
  }
}
```

**Output JSON:**

```json
{
  "thoughts": "The prompt requires using a utility function to validate the input field. I'll use the email pattern from the utility and display an error message in the input field if the validation fails.",
  "error": {},
  "response": {
    "eventListener": "function main(event, args) {const formData = new FormData(event.currentTarget);\n const emailValue = formData.get('email'); const emailPattern = new RegExp(args.$emailPattern); if (!emailPattern.test(emailValue)) { emailValue.setCustomValidity('Please enter a valid email address.'); } else { emailValue.setCustomValidity(''); } }",
    "globals": {},
    "imports": []
  },
  "expect": "The `args` object must contain a key '$emailPattern' with a string value representing the regular expression for email validation and the form should have a field with name property set to 'email'"
}
```
