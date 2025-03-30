### How to perform DOM Manipulation

This subsection focuses on examples where event listeners directly modify the Document Object Model (DOM), such as changing text content, adding classes, or modifying attributes.

#### Example 1: Modifying Text Content of a Paragraph

**Description:** An `onInput` event listener that changes the text content of a paragraph element when the user types in a text input.

**Input JSON:**

```json
{
  "listner": "onInput",
  "type": "text",
  "prompt": "Change the text content of the paragraph with the ID 'myParagraph' to 'Text changed!' when the user types in the input field."
}
```

**Output JSON:**

```json
{
  "thoughts": "An event listener will be generated to update the text content of the paragraph element when the user types in the input field.",
  "error": {},
  "response": {
    "eventListener": "function main(event, args) { document.getElementById('myParagraph')?.textContent = 'Text changed!'; }",
    "globals": {},
    "imports": []
  },
  "expect": "An element with the ID 'myParagraph' must exist in the DOM."
}
```

#### Example 2: Adding a CSS Class to an Input Element

**Description:** An onInput event listener that adds a CSS class to an input field when the user types in it.

**Input JSON:**

```json
{
  "listner": "onInput",
  "type": "text",
  "prompt": "Add the class 'highlight' to the input field with the ID 'myInput' when the user types in it."
}
```

**Output JSON:**

```json
{
  "thoughts": "The event listener will add the class 'highlight' to the input field when the user types in it.",
  "error": {},
  "response": {
    "eventListener": "function main(event, args) { const target = document.getElementById('myInput'); if (!target) { console.warn('Input field with id myInput does not exist in DOM'); return; } target.classList.add('highlight'); }",
    "globals": {},
    "imports": []
  },
  "expect": "An element with the ID 'myInput' must exist in the DOM, and a CSS rule for the 'highlight' class should be defined."
}
```

#### Example 3: Reusing an Element using globals

**Description:** This example demonstrates reusing a DOM element by storing a reference to an input field in the globals object.

**Input JSON:**

```json
{
  "listner": "onInput",
  "type": "text",
  "prompt": "Create a new paragraph element that updates the text 'Character count: ' followed by the number of characters typed in the input field."
}
```

**Output JSON:**

```json
{
  "thoughts": "The prompt instructs to create a paragraph and update its content on each input. A reference to the paragraph will be stored in globals to prevent duplicate creation.",
  "error": {},
  "response": {
    "eventListener": "function main(event, args) { if (!globals.myParagraph) { fnCreateAndAppendElement(); } fnShowAndUpdateCount(event); }",
    "globals": {
      "myParagraph": null
    },
    "imports": [],
    "helperFunctions": [
      "function fnCreateAndAppendElement() { globals.myParagraph = document.createElement('p'); document.body.appendChild(globals.myParagraph); }",
      "function fnShowAndUpdateCount(event) { globals.myParagraph.textContent = 'Character count: ' + event.target.value.length; }"
    ]
  },
  "expect": "No specific elements are required. The code will create a paragraph and update its content on each input."
}
```
