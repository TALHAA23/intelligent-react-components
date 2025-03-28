- **Form Data:** Store the form's data as an object.
  ```javascript
  globals.formData = {
    username: usernameInput.value,
    email: emailInput.value,
  };
  ```
- **Form Validation State:** Store the overall validation state of the form.
  ```javascript
  globals.isFormValid = validateForm(globals.formData);
  ```
- **Submitted Form Data:** store the submitted form data.
  ```javascript
  globals.submittedData = globals.formData;
  ```
- **Form Step State:** store the current step of the form.
  ```javascript
  globals.currentStep = 1;
  ```
