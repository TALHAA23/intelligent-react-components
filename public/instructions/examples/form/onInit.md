### How to use `onInit` if its a prompt

**Example: When onInit is a String**
When onInit is a string, it acts as a prompt describing the initialization logic. The model should generate a function named `onInitialRender` that holds the described behavior. This function should accept the form element (target) as its first argument, args as secound argument and apply the logic accordingly.

**Input JSON**

```json
{
  "listner": "onSubmit",
  "type": "form",
  "prompt": "a function that console the form data",
  "onInit": "Add a border to all form elements and set the form's background color to lightgray."
}
```

**Output JSON**

```json
{
  "thoughts": "The prompt wants to console the form data when the form is submitted. It also processed an onInit prompt, so I will generate an onInitialRender function to add a border to form elements and set the form's background color.",
  "response": {
    "eventListener": "function main(event, args) { console.log(args._formData); }",
    "onInitialRender": "function onInitialRender(target, args) { target.style.backgroundColor = 'lightgray'; Array.from(target.elements).forEach(element => { element.style.border = '1px solid gray'; }); }"
  },
  "expect": "Ensure the event listener is onSubmit. Initially, the form elements will have borders and the form's background will be lightgray, as described in the onInit prompt. The '_formData' key in the args object will contain the form's data."
}
```
