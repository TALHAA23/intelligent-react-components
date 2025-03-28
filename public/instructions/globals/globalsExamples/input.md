- **Debounced Input Value:** Store the debounced value of an input field to reduce the frequency of updates.
  ```javascript
  globals.debouncedValue = event.target.value;
  ```
- **Validation State:** Store the validation state of the input field (e.g., valid/invalid).
  ```javascript
  globals.isValid = validateInput(event.target.value);
  ```
- **Previous Input Value:** Store the previous value of the input field for comparison.
  ```javascript
  globals.previousValue = event.target.value;
  ```
