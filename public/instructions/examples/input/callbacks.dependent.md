#### Dependent Callbacks

These examples showcase the use of dependent callback functions (functions that require parameters).

**Example 1: Conditional Dependent Callback Based on Input Length**

**Description:** This example demonstrates calling a dependent callback function when the length of the input value exceeds a specified threshold.

**Input JSON**

```json
{
  "listner": "onInput",
  "type": "password",
  "prompt": "Call the dependent callback 'validatePasswordStrength' if the length of the password exceeds '_minLength', passing the password value and '_validationCriteria' as parameters.",
  "supportingProps": {
    "variables": {
      "_minLength": 8,
      "_validationCriteria": ["uppercase", "lowercase", "number"]
    }
  },
  "callbacks": {
    "dependent": [
      {
        "callback": "validatePasswordStrength",
        "callGuide": "Call this function to validate password strength when the length exceeds the minimum length.",
        "parametersGuide": [
          "Pass the input value",
          "Pass the validation criteria array"
        ]
      }
    ]
  }
}
```

**Output JSON**

```json
{
  "thoughts": "The 'input' listener is used to trigger the callback function when the length of the input value exceeds the specified threshold. Parameters are passed based on the parametersGuide.",
  "error": {},
  "response": {
    "eventListener": "function main(event, args) {\n  const inputValue = event.target.value;\n  if (inputValue.length > args._minLength) {\n    args.validatePasswordStrength(inputValue, args._validationCriteria);\n  }\n}",
    "globals": {},
    "imports": []
  },
  "expect": "The `args` object must contain keys '_minLength' (number), '_validationCriteria' (array), and 'validatePasswordStrength' (a function accepting a string and an array as parameters)."
}
```
