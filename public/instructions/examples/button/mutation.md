### How to work with `mutation` array

This section demonstrates how to use the `mutation` field to perform state updates.

**Example 1: Conditional Mutation with Variable and Utils**

**Description:** This example demonstrates a conditional mutation using a variable, and a utility.

**Input JSON:**

```json
{
  "listener": "onClick",
  "prompt": "If the value of variable '_userLevel' is greater than or equal to the value specified by the utility '$requiredLevel', call the '&updateUserLevel' with the value 10. Otherwise, call it with the value 5",
  "supportingProps": {
    "variables": {
      "_userLevel": 8
    },
    "utils": {
      "$requiredLevel": "7"
    }
  },
  "mutation": [
    {
      "id": "updateUserLevel",
      "returnFormat": "number",
      "mutationType": "callback"
    }
  ]
}
```

**Output JSON:**

```json
{
  "thoughts": "This event listener performs a conditional mutation based on a variable and a utility values. The `updateUserLevel` callback function is used for updating.",
  "error": {},
  "response": {
    "eventListener": "function main(event, args) { const userLevel = args._userLevel; const requiredLevel = parseInt(args.$requiredLevel); if (userLevel >= requiredLevel) { args.updateUserLevel(10); } else { args.updateUserLevel(5); } }",
    "globals": {},
    "imports": []
  },
  "expect": "The `args` object must contain keys '_userLevel' (numeric), '$requiredLevel' (string representing an integer), and 'updateUserLevel' (a callback function that accepts a number as an argument)."
}
```

**Example 2: Asynchronous Mutation with Assignment Type**

**Description:** This example demonstrates an asynchronous mutation using the assignment type.

**Input JSON:**

```json
{
  "listener": "onClick",
  "prompt": "Fetch data from '$apiEndpoint', set the value of '&loadingState' to true, then after fetching the data set the value to false. If the fetch was successful set the value of '&data' to response.data otherwise set it to an empty array",
  "supportingProps": {
    "utils": {
      "$apiEndpoint": "https://api.example.com/data"
    }
  },
  "mutation": [
    {
      "id": "loadingState",
      "returnFormat": "boolean",
      "mutationType": "assignment"
    },
    {
      "id": "data",
      "returnFormat": "array",
      "mutationType": "assignment"
    }
  ]
}
```

**Output JSON:**

```json
{
  "thoughts": "This example demonstrates an asynchronous mutation using assignment to update the loading state and fetched data. Error handling is included.",
  "error": {},
  "response": {
    "eventListener": "async function main(event, args) {\n  args.loadingState = true;\n  try {\n    const response = await fetch(args.$apiEndpoint);\n    if (response.ok) {\n      const data = await response.json();\n      args.data = data.data || [];\n    } else {\n      args.data = [];\n    }\n  } catch (error) {\n    console.error('Error fetching data:', error);\n    args.data = [];\n  } finally {\n    args.loadingState = false;\n  }\n}",
    "globals": {},
    "imports": []
  },
  "expect": "The `args` object must contain keys '$apiEndpoint' (string representing a valid API endpoint), 'loadingState', and 'data'.  'loadingState' and 'data' are used as variables to update and should be able to handle boolean and array values respectively."
}
```

**Example 3: Clarifying Assignment vs. Callback Mutations vs. Mutation without MutationType**

**Description:** This example explicitly demonstrates the difference between assignment and callback mutations and mutationType assumation. Note that when a mutation depends on some prev state but prev state is not provided in supportingProps assume the mutation to be a React State setter so you can use prevValues as set(prev=>{...})

**Input JSON:**

```json
{
  "listener": "click",
  "prompt": "Set the value of the variable `_counter` to 10 using assignment mutation '&counterAssignment'. Then, call the callback mutation '&counterCallback' with the value 20 and  update '&counterWithoutMutationType' with the value 5",
  "mutation": [
    {
      "id": "counterAssignment",
      "returnFormat": "number",
      "mutationType": "assignment"
    },
    {
      "id": "counterCallback",
      "returnFormat": "number",
      "mutationType": "callback"
    },
    {
      "id": "counterWithoutMutationType",
      "returnFormat": "number"
    }
  ],
  "callbacks": {
    "independent": []
  }
}
```

**Output JSON:**

```json
{
  "thoughts": "This example explicitly showcases the difference between assignment and callback mutations.  The `counterAssignment` variable will be directly assigned a value; the `counterCallback` function will be invoked with a value.",
  "error": {},
  "response": {
    "eventListener": "function main(event, args) { args.counterAssignment = 10; args.counterCallback(20); args.counterWithoutMutationType(5) }",
    "globals": {},
    "imports": []
  },
  "expect": "The `args` object must contain keys `counterAssignment` and `counterCallback`. `counterAssignment` should be a variable that accepts a numeric value; `counterCallback` should be a function that accepts a numeric value."
}
```
