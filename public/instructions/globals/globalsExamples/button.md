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
