### How to use `supportingProps.variables`

These examples demonstrate event listeners working with data, for example, updating form values, validating input, or interacting with data structures.

**Example 1: Updating Form Value**

**Description:** A change event listener that updates a hidden input field with the value entered in a text input field.

**Input JSON:**

```json
{
  "listener": "click",
  "prompt": "Update the value of the hidden input field with the id '_hiddenInput' with the value entered in the text input field with the id 'textInput'",
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

**Example 2: Array Manipulation**

**Description:** A click event listener that adds a new item to an array and then displays the updated array in a paragraph. It also who how one variable if prefix with `_` and one is not, so we call it using args how it is suppose to be called.

**Input JSON:**

```json
{
  "listener": "click",
  "prompt": "Add the string 'New Item' to the array '_myArray' and display the updated array in the paragraph with the ID 'myArrayDisplay'",
  "supportingProps": {
    "variables": {
      "myArray": "myArray",
      "_myArrayDisplay": "myArrayDisplay"
    }
  }
}
```

**Output JSON:**

```json
{
  "thoughts": "This event listener adds a new item to an array and updates the display.  The target is implied.",
  "error": {},
  "response": {
    "eventListener": "function main(event, args) { let myArray = args.myArray; myArray.push('New Item'); document.getElementById(args._myArrayDisplay).textContent = JSON.stringify(myArray); }",
    "globals": {},
    "imports": []
  },
  "expect": "Elements with the IDs 'myArrayDisplay' must exist in the DOM, and the `args` argument must contain a key named 'myArray' with a value that is an array."
}
```
