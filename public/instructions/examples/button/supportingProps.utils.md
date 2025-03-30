### How to use `supportingProps.utils` (aliases)

This subsection shows how to utils from `supportingProps.utils`.

**Example 1: Using utils (String Value)**

**Description:** This example demonstrates using a string value from `supportingProps.utils` within a URL.

**Input JSON:**

```json
{
  "listener": "click",
  "prompt": "Open a new browser tab with the URL: '$baseUrl/$endpoint'",
  "supportingProps": {
    "utils": {
      "$baseUrl": "https://example.com",
      "$endpoint": "users"
    }
  }
}
```

**Output JSON**

```json
{
  "thoughts": "The prompt requires constructing a URL using values from supportingProps.utils.  I will use template literals to create the URL and open a new tab.",
  "error": {},
  "response": {
    "eventListener": "function main(event, args) { window.open(`${args.$baseUrl}/${args.$endpoint}`); }",
    "globals": {},
    "imports": []
  },
  "expect": "The `args` object must contain keys '$baseUrl' and '$endpoint' with string values representing the base URL and endpoint, respectively."
}
```

**Example 2: Dynamic Target Selector**

**Description:** This example demonstrates using a utility to generate the target selector dynamically.

**Input JSON:**

```json
{
  "listener": "click",
  "prompt": "Add the class 'active' to the element whose ID is '$getTargetId'",
  "supportingProps": {
    "utils": {
      "$getTargetId": "button3"
    }
  }
}
```

**Output JSON:**

```json
{
  "thoughts": "The prompt requires dynamically generating the target selector using a utility. The class 'active' will be added to the element whose ID matches the value getTargetId util.",
  "error": {},
  "response": {
    "eventListener": "function main(event, args) { const targetElement = document.getElementById(args.$getTargetId); if (targetElement) { targetElement.classList.add('active'); } else { console.error(`Element with ID '${args.$getTargetId}' not found`); } }",
    "globals": {},
    "imports": []
  },
  "expect": "An element with the ID specified by the value of `args.$getTargetId` must exist in the DOM, and a CSS rule for the class 'active' must be defined. The `args` object must contain a key '$getTargetId' with a string value representing the ID of the target element."
}
```
