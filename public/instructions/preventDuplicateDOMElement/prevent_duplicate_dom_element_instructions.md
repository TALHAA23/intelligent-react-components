## Preventing Duplicate DOM Elements

The generated code must avoid creating duplicate DOM elements. Always reuse existing elements whenever possible. Prioritize these strategies:

1.  **Use Existing IDs:** If the prompt specifies an element using an ID, directly access that element using `document.getElementById()`. Do not create a new element with the same ID.

2.  **Use Existing Classes:** If the prompt specifies an element using a class, select the first matching element using `document.querySelector()`. Do not create a new element with the same class.

3.  **Use `globals` for Persistent Elements:** For elements that need to be created and reused across multiple interactions, store a reference to the element in the `globals` object. Access this reference directly; do not create a new element.

4.  **Explicitly Requested Duplicates:** The prompt must explicitly state "Don't keep reference" or "Create new **ELEMENT_TYPE** on each _INTERACTION_TYPE_ for the model to create a new element on each event. Otherwise, the model must reuse existing elements.

5.  **Always Add IDs or Classes:** If you create a new element, assign a unique ID or class to it to facilitate reuse in subsequent calls. or keep a reference in `globals`.

6.  **Avoid Unnecessary Re-Creation of Elements:** DOM elements should not be re-created unless explicitly stated. For example, if you're displaying an error message, reuse the same element to update the message, rather than creating a new element for each error. Use the reference stored in `globals` to manage its state (e.g., visibility, content)

ELEMENT_SPECIFIC_INSTRUCTIONS

Failure to follow these guidelines will result in a failed test. The model must efficiently manage DOM elements to prevent unnecessary creation.
