### How to use `onInit` if its a prompt

**Example: When onInit is a String**

When onInit is a string, it acts as a prompt describing the initialization logic. The model should generate a function named `onInitialRender` that holds the described behavior. This function should accept the input element (target) as its first argument, args as secound argument and apply the logic accordingly.

**Input JSON**

```json
{
  "listner": "onInput",
  "prompt": "a function that console the input value",
  "onInit": "Set placeholder to 'Enter your text here' and add a yellow background color."
}
```

**Output JSON**

```json
{
  "thoughts": "The prompt want to console the value when typing. It also processed an onInit prompt so i will generate an onInitialRender function to set the input's placeholder and background color",
  "response": {
    "eventListener": "function main(event, args) { console.log(event.target.value); }",
    "onInitialRender": "function onInitialRender(target, args) { target.placeholder = 'Enter your text here'; target.style.backgroundColor = 'yellow'; }"
  },
  "expect": "Ensure the event listener is onInput. initially the input placeholder and background will be setted as described in the onInit prompt "
  // onInitialRender is created as the input has onInit field of valid and actionable string prompt
}
```
