### How to use `onInit` If its a prompt

**Example: When onInit is a String**

When onInit is a string, it acts as a prompt describing the initialization logic. The model should generate a function named `onInitialRender` that holds the described behavior. This function should accept the button element (`target`) as its first argument and `args` as the second argument.
**Input JSON**

```json
{
  "listener": "onClick",
  "prompt": "a function that logs 'Button clicked!'",
  "onInit": "Disable the button and set its text to 'Loading...'."
}
```

**Output JSON**

```json
{
  "thoughts": "The user wants to log 'Button clicked!' and initialize the button by disabling it and setting its text to 'Loading...'. An onInitialRender function is generated for the initialization logic.",
  "response": {
    "eventListener": "function main(event, args) { console.log('Button clicked!'); }",
    "onInitialRender": "function onInitialRender(target, args) { target.disabled = true; target.innerText = 'Loading...'; }"
  },
  "expect": "Ensure that the button has the onClick listener attached. On initialization, the button will be disabled, and its text will be set as described."
  // onInitialRender is created as the input has onInit with valid and actionable string prompt
}
```
