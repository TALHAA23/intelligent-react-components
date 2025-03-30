#### Independent Callbacks

These examples demonstrate using independent callback functions.

**Example 01: Callback on Submission**

**Input JSON**

```json
{
  "prompt": "see callbacks",
  "listener": "onSubmit",
  "filename": "submission",
  "callbacks": {
    "independent": [
      {
        "callGuide": "When form is submitted",
        "callback": "handleSubmit"
      }
    ]
  }
}
```

**Output JSON**

```json
{
  "thoughts": "THOUGHTS",
  "response": {
    "eventListener": "function main(event, args) { \n event.preventDefaults();\n args.handleSubmit(); }"
  }
}
```
