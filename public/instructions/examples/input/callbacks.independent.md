#### Independent Callbacks

These examples demonstrate using independent callback functions.

**Example 1: Independent Callback for a File Input**

**Description:** This example demonstrates using an independent callback function for handling file uploads.

**Input JSON**

```json
{
  "listner": "onChange",
  "type": "file",
  "prompt": "Console 'Select a file'.",
  "callbacks": {
    "independent": [
      {
        "callGuide": "Call this callback when a file is selected.",
        "callback": "onFileSelect"
      }
    ]
  }
}
```

**Output JSON**

```json
{
  "thoughts": "An event listener for the 'change' event on a file input is implemented to call the 'onFileSelect' callback with the selected file(s).",
  "error": {},
  "response": {
    "eventListener": "function main(event, args) {console.log('Select a file');\n const files = event.target.files; args.onFileSelect(files); }",
    "globals": {},
    "imports": []
  },
  "expect": "The `args` object must contain a key 'onFileSelect' whose value is a function that accepts the FileList object from the input."
}
```

**Example 2: Independent Callback for a Checkbox Input**

**Description:** This example demonstrates an independent callback function triggered when a checkbox is toggled.

**Input JSON**

```json
{
  "listner": "onChange",
  "type": "checkbox",
  "prompt": "Call callbacks.",
  "callbacks": {
    "independent": [
      {
        "callGuide": "Call this callback when the checkbox is toggled. Pass true if checked, otherwise pass false.",
        "callback": "onToggle"
      }
    ]
  }
}
```

**Output JSON**

```json
{
  "thoughts": "An event listener for the 'change' event on a checkbox input is created to call the 'onToggle' callback with a boolean value indicating the checked state.",
  "error": {},
  "response": {
    "eventListener": "function main(event, args) { const isChecked = event.target.checked; args.onToggle(isChecked); }",
    "globals": {},
    "imports": []
  },
  "expect": "The `args` object must contain a key 'onToggle' whose value is a function that accepts a boolean indicating the checkbox's checked state."
}
```

**Example 3: Handling Input Value Changes with an Independent Callback**

**Description:** This example demonstrates setting up an onChange listener dynamically to handle input value changes, ensuring alignment with the specified prompt.

**Input JSON**

```json
{
  "listner": "onInput",
  "type": "text",
  "prompt": "Alert 'Limit excceed' when the input value length is greater than 20",
  "callbacks": {
    "independent": [
      {
        "callGuide": "Call this callback whenever the input value changes.",
        "callback": "onInputChange"
      }
    ]
  }
}
```

**Output JSON**

```json
{
  "thoughts": "The 'input' event will be used to dynamically attach an 'onChange' listener to the input element, ensuring the callback 'onInputChange' is called only when the value changes.",
  "error": {},
  "response": {
    "eventListener": "function main(event, args, globals) {\n  const inputElement = event.target;\n if(inputElement.value.limit > 20)\n  { alert('Limit Excceed') }\n  if (!globals._onChangeListenerAdded) {\n    inputElement.addEventListener('change', (e) => {\n      args.onInputChange(e.target.value);\n    });\n    globals._onChangeListenerAdded = true; // Ensures this logic runs only once.\n  }\n}",
    "globals": {
      "_onChangeListenerAdded": false
    },
    "imports": []
  },
  "expect": "The `args` object must contain a key 'onInputChange' whose value is a function accepting the updated input value as an argument. The input must be a text input."
}
```
