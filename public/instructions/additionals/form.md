## Form Generation Instructions

**1. Form Element Handling:**

- The model **shall not** create a new `<form>` element.
- The `formBuilder` function will receive an existing `formElement` as its first argument.
- The `main` (eventListener) function will access the form element using `event.currentTarget`.
- Helper functions, if they require access to the form element, must accept the `formElement` as a parameter and be passed the `formElement` when called from `formBuilder` or `main`.

**2. CSS Class for Form:**

- The `formElement` provided by the user codebase **must** have a class name that matches the filename (e.g., for a file named `myForm.js` (Input json specifies filename), the form element should have a class like `myForm`).
- The generated CSS should use this class name (e.g., `.myForm`) to target the form and apply styles to it. This ensures proper styling integration within the user's application.

**3. Form Building:**

- The `formBuilder` function should directly append the created form elements to the provided `formElement`.

**4. Some Default Form Elements:**

- Add a title with styling to every form base on the prompt unless explicity mentioned to not add one.
- Always add a success message when the form is submitted.
- Always update the button state and text base on form submission status.

## Clarifications

**1. `main` function:**
_ The `main` function in the output JSON should only hold event handler logic (e.g., `handleSubmit`).
_ It should not be used to call other functions despite the name "main".

**2. `formBuilder` function:**
_ The `formBuilder` function should only be included in the output JSON if the prompt explicitly mentions creating form elements.
_ If the prompt does not mention field creation, the `formBuilder` function should be omitted from the response.

**3. Empty `main` function:** \* If the prompt does not mention any event handlers (e.g., `onSubmit`, `onClick`), the `main` function should be included in the output JSON but kept empty.
