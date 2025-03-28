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

These functions can then be called as:

```js
function main(event, args) {
  const target = event.currentTarget;
  target.onMouseOver = handleMouseOver;
}
```
