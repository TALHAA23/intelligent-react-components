### How to work with `mutation`

This section demonstrates how to use the `mutation` field to perform state updates.

#### Example 1: Conditional State Update with Variable and Utility

**Description:** This example demonstrates a conditional mutation operation based on a variable and a utility function. If the user's score meets or exceeds a required threshold, the mutation updates the user's status.

**Input JSON:**

```json
{
  "listner": "onInput",
  "type": "text",
  "prompt": "If the value of the input exceeds the threshold defined by '$scoreThreshold', call the mutation callback '&updateUserStatus' with 'VIP'. Otherwise, call it with 'Regular'.",
  "supportingProps": {
    "variables": {
      "_userScore": "65"
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
  "thoughts": "This example conditionally updates the user’s status based on their score and the threshold defined by the utility.",
  "error": {},
  "response": {
    "eventListener": "function main(event, args) { const userScore = parseInt(args._userScore); const scoreThreshold = parseInt(args.$scoreThreshold); const status = userScore >= scoreThreshold ? 'VIP' : 'Regular'; args.updateUserStatus(status); }",
    "globals": {},
    "imports": []
  },
  "expect": "The `args` object must contain keys '_userScore' (numeric) and '$scoreThreshold' (string). The mutation callback `updateUserStatus` should accept a string argument representing the user's status."
}
```

#### Example 2: Updating Loading State and Data with Assignment Mutation

**Description:** This example demonstrates how to use mutation operations to update the loading state and fetched data based on an asynchronous fetch request.

**Input JSON:**

```json
{
  "listner": "input",
  "type": "text",
  "prompt": "When the input value changes, set the loading state to true, perform an async fetch to '$apiEndpoint', then update the loading state to false. If successful, assign the fetched data to the mutation '&userData', otherwise assign an empty array.",
  "supportingProps": {
    "utils": {
      "$apiEndpoint": "https://api.example.com/userdata"
    }
  },
  "mutation": [
    {
      "id": "loadingState",
      "mutationType": "assignment",
      "returnFormat": "boolean"
    },
    {
      "id": "userData",
      "mutationType": "assignment",
      "returnFormat": "array"
    }
  ]
}
```

**Output JSON:**

```json
{
  "thoughts": "This event listener performs an async fetch and updates the state accordingly using assignment mutations for loading and data.",
  "error": {},
  "response": {
    "eventListener": "async function main(event, args) { args.loadingState = true; try { const response = await fetch(args.$apiEndpoint); if (response.ok) { const data = await response.json(); args.userData = data || []; } else { args.userData = []; } } catch (error) { args.userData = []; console.error('Fetch error:', error); } finally { args.loadingState = false; } }",
    "globals": {},
    "imports": []
  },
  "expect": "The `args` object must contain keys '$apiEndpoint' (string), 'loadingState' (boolean), and 'userData' (array). The `userData` will be updated with fetched data, or an empty array if an error occurs."
}
```

Note then if a `mutation` depends on prev value but the prev value is not provide in supportingProps assume the mutation to be a React State Setter and use the prev state as setState(prev=>{...})
