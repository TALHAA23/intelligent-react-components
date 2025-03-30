#### Dependent Callbacks

These examples showcase the use of dependent callback functions (functions that require parameters).

**Example 1: Simple Dependent Callback**

**Description:** This example demonstrates a simple dependent callback function that receives parameters based on the `parameterGuide`.

**Input JSON:**

```json
{
  "listener": "onClick",
  "prompt": "Increment _threshold by 2.",
  "supportingProps": {
    "variables": {
      "_threshold": 4,
      "_data": []
    }
  },
  "callbacks": {
    "dependent": [
      {
        "callback": "callWithArgs",
        "callGuide": "Call this function if _threshold is greater than 2",
        "parametersGuide": ["Pass the _threshold value", "pass _data"]
      }
    ]
  }
}
```

**Output JSON:**

```json
{
  "thoughts": "The prompt instructs to call a dependent callback if a condition is met. The parameters for the callback are specified in `parametersGuide`.",
  "error": {},
  "response": {
    "eventListener": "function main(event, args) { const updatedThreshold =  args._threshold+2;\n if (updatedThreshold > 2) { args.callWithArgs(updateThreshold, args._data); } }",
    "globals": {},
    "imports": []
  },
  "expect": "The `args` object must contain keys '_threshold' (number) and '_data' (array).  It must also contain a key 'callWithArgs' whose value is a function that accepts a number and an array as parameters. Main mutate the threshold value and the update one is used to condition and argument without the user mentioning it."
}
```
