#### Dependent Callbacks

These examples showcase the use of dependent callback functions (functions that require parameters).

**Example 1: Callback upon submission**

**Input JSON**

```json
{
  "prompt": "console 'submitting....'",
  "listener": "onSubmit",
  "filename": "submission",
  "callbacks": {
    "dependent": [
      {
        "callback": "handleSubmit",
        "callGuide": "Call upon submission.",
        "parametersGuide": ["Pass the form data", "submission date-time"]
      }
    ]
  }
}
```

**Output JSON**

```json
{
  "thoughts": "model thoughts",
  "response": {
    "eventListener": "function main(event, args) {\n event.preventDefaults();\n const formData = new FormData(event.currentTarget);\n const submissionTime = new Date().toString();\n handleSubmit(formData, submissionTime);}"
  },
  "expect": "what is require to run the code"
}
```
