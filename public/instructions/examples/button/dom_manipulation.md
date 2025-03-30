### How to perform DOM Manipulation

This subsection focuses on examples where event listeners directly modify the Document Object Model (DOM), such as changing text content, adding classes, or modifying attributes.

### Example1: Modifying Text Content

**Description:** A click event listener that changes the text content of a paragraph element.

**Input JSON:**

```json
{
  "listener": "click",
  "prompt": "Change the text content of the paragraph with the ID 'myParagraph' to 'Text changed!'"
}
```

**Output JSON**

```json
{
  "thoughts": "An event listener will be generated to update the text content of the paragraph element.",
  "error": {},
  "response": {
    "eventListener": "function main(event, args) { document.getElementById('myParagraph')?.textContent = 'Text changed!'; }",
    "globals": {},
    "imports": []
  },
  "expect": "An element with the ID 'myParagraph' must exist in the DOM."
}
```

**Example 2: Adding a CSS Class**

**Description:** A click event listener that adds a CSS class to a button element.

**Input JSON:**

```json
{
  "listener": "click",
  "prompt": "Add the class 'highlight' to the button with the ID 'myButton'"
}
```

**Output JSON:**

```json
{
  "thoughts": "The event listener will add the class 'highlight' to the button element.  The target element is implied.",
  "error": {},
  "response": {
    "eventListener": "function main(event, args) {\n  const target =  document.getElementById('myButton')\n    if(!target) {\n    console.warn('Button with id myButton do no exist in DOM')\n    return\n    }\n    target.classList.add('highlight');\n    }",
    "globals": {},
    "imports": []
  },
  "expect": "An element with the ID 'myButton' must exist in the DOM, and a CSS rule for the 'highlight' class should be defined."
}
```

**Example 3: Reusing an Element using `globals`**
**Description:** This example demonstrates reusing a DOM element by storing a reference in the `globals` object.

**Input JSON:**

```json
{
  "listener": "click",
  "prompt": "Create a new div with the class 'myDiv' and add the text 'Click count: ' followed by the click count to it on each click. ",
  "supportingProps": {
    "variables": {}
  }
}
```

**Output JSON:**

```json
{
  "thoughts": "The prompt instructs to create a div and update its content on each click. A reference to the div will be stored in globals to prevent duplicate creation.",
  "error": {},
  "response": {
    "eventListener": "function main(event, args) {\n  if (!globals.myDiv) {\n    fnCreateAndAppendElement()\n  }\n  fnShowAndUpateCount()\n    }",
    "globals": { "clickCount": 0, "myDiv": null },
    "imports": [],
    "helperFunctions": [
      "function fnCreateAndAppendElement() {\n  globals.myDiv = document.createElement('div');\n  globals.myDiv.classList.add('myDiv');\n  document.body.appendChild(globals.myDiv);\n}",
      "function fnShowAndUpateCount() {\n  globals.myDiv.textContent = 'Click count: ' + (globals.clickCount || 0);\n  if (!globals.clickCount) globals.clickCount = 0;\n  globals.clickCount++;\n}"
    ]
  },
  "expect": "No specific elements are required. The code will create a div with the class 'myDiv' and update its content on each click."
}
```
