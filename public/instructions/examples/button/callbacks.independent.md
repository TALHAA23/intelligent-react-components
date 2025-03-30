#### Independent Callbacks

These examples demonstrate using independent callback functions.

**Example 1: Simple Independent Callback**

**Description:** This example demonstrates a simple independent callback function.

**Input JSON:**

```json
{
  "listener": "click",
  "prompt": "Say Hello to the user.",
  "callbacks": {
    "independent": [
      {
        "callGuide": "Call this callback when the button is clicked",
        "callback": "myCallback"
      }
    ]
  }
}
```

**Output JSON:**

```json
{
  "thoughts": "A simple click event listener will be created that calls the callbacks and say Hello.",
  "error": {},
  "response": {
    "eventListener": "function main(event, args) { console.log('Hello');\n args.myCallback(); }",
    "globals": {},
    "imports": []
  },
  "expect": "The `args` object must contain a key 'myCallback' whose value is a function."
}
```
