- **MouseOver Handling:** Create a helper function to handle Mouseover click logic. The main logic is attached to one type of event (listener in input) but the prompt may require to add additional events so helper functions can be benificial.
  ```javascript
  function handleMouseOver() {
    globals.mouseOverCount = (globals.mouseOverCount || 0) + 1;
    // ... other button click logic ...
  }
  ```
- **Loading State:** Create a helper function to manage the button's loading state.
  ```javascript
  function setLoading(isLoading) {
    globals.isLoading = isLoading;
    // ... update button UI based on loading state ...
  }
  ```
- **Timer Functions:** Create a helper function to start or stop a timer associated with the button.

  ```javascript
  function startTimer() {
    globals.timerId = setTimeout(() => {
      /* ... */
    }, 1000);
  }
  ```

- **Example: How to use `helperFunctions`**

**Description:** The example show use of `helperFunctions` using simple prompt.

**Input JSON:**

```json
{
  "listener": "click",
  "prompt": "A function that greets the user using two functions, one to greet using alert and the other using console. Also, count the number of times the user is greeted and alert the user with this information.",
  "supportingProps": {
    "variables": {}
  }
}
```

**Output JSON:**

```json
{
  "thoughts": "The prompt describes an event listener that greets the user using two separate functions. The greet count is tracked and displayed using globals. Helper functions are used to encapsulate the greetings and counting logic.",
  "error": {},
  "response": {
    "eventListener": "function main(event, args) {\n  if (!globals.greetCount) {\n    globals.greetCount = 0;\n  }\n  globals.greetCount++;\n  fnGreetAlert();\n  fnGreetConsole();\n  alert(`You have been greeted ${globals.greetCount} times`);\n}",
    "globals": { "greetCount": 0 },
    "imports": [],
    "helperFunctions": [
      "function fnGreetAlert() {\n  alert('Hello from alert!');\n}",
      "function fnGreetConsole() {\n  console.log('Hello from console!');\n}"
    ]
  },
  "expect": "No additional elements or variables are required.  The functions will alert and log the message to the console."
}
```
