- **Click Counter:** Track the number of times a button has been clicked.
  ```javascript
  globals.clickCount = (globals.clickCount || 0) + 1;
  ```
- **Button State:** Store the button's state (e.g., enabled/disabled, loading state).
  ```javascript
  globals.isLoading = true;
  ```
- **Timer:** Store a timer or interval ID to manage asynchronous operations related to the button.

  ```javascript
  globals.timerId = setTimeout(() => {
    /* ... */
  }, 1000);
  ```

- **Example:**

**Description:** This example demonstrates using `globals` to maintain a variable across multiple button clicks.

**Input JSON:**

```json
{
  "listener": "click",
  "prompt": "Increment a click counter each time the button is clicked and display the current count in an alert box"
}
```

**Output JSON:**

```json
{
  "thoughts": "A click counter will be implemented using the `globals` field to maintain state across multiple clicks.",
  "error": {},
  "response": {
    "eventListener": "function main(event, args) { if (!globals.clickCount) { globals.clickCount = 0; } globals.clickCount++; alert(`Button clicked ${globals.clickCount} times`); }",
    "globals": {
      "clickCount": 0
    },
    "imports": []
  },
  "expect": "The generated code will correctly increment and display the click counter. No additional elements are needed in the DOM."
}
```
