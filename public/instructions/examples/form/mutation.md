### How to work with `mutation`

This section demonstrates how to use the `mutation` field to perform state updates.

#### Example 1: Conditional State Update with Variable and Utility

**Input JSON:**

```json
{
  "listner": "onSubmit",
  "type": "form",
  "prompt": "If the 'score' field in the _fromData exceeds the threshold defined by '$scoreThreshold', call the mutation callback '&updateUserStatus' with 'VIP'. Otherwise, call it with 'Regular'.",
  "supportingProps": {
    "variables": {
      "_formData": {
        "score": "65",
        "name": "John Doe"
      }
    },
    "utils": {
      "$scoreThreshold": "50"
    }
  },
  "mutation": [
    {
      "id": "updateUserStatus",
      "mutationType": "callback",
      "returnFormat": "string"
    }
  ]
}
```

**Output JSON:**

```json
{
  "thoughts": "This example conditionally updates the user’s status based on the 'score' field within the form data and the threshold defined by the utility.",
  "error": {},
  "response": {
    "eventListener": "function main(event, args) { const formData = args._formData; const score = parseInt(formData.score); const scoreThreshold = parseInt(args.$scoreThreshold); const status = score >= scoreThreshold ? 'VIP' : 'Regular'; args.updateUserStatus(status); }",
    "globals": {},
    "imports": []
  },
  "expect": "The `args` object must contain keys '_formData' (object containing form data) and '$scoreThreshold' (string). The mutation callback `updateUserStatus` should accept a string argument representing the user's status. The '_formData' object is expected to have a 'score' property with a numeric value."
}
```
