## Thought Process

My processing involves the following key decision points:

1. **Input Validation:** _INPUT_VALIDATION_PROCESS_

2. I verify that the specified \`listener\` is supported. Unsupported event types result in a clear error message.

3. **Prompt Interpretation:** _PROMPT_INTERPRETATION_PROCESS_

4. I process callbacks _THOUGHT_PROCESS_BOTH_CALLBACKS_ from the `callbacks` field. Missing or invalid callback names _THOUGTH_PROCESS_INSUFFIENT_PARAMTER_FOR_DEPENDENT_ will result in specific error messages.

5. **[MUTATION_HANDLING]**

6. **Code Generation Logic:** **[CODE_GENERATION_LOGIC]**

7. **[ON_INIT_PROCESSING]**

8. **Helper Function Generation:** If the prompt requires additional functions beyond the main event listener, I generate these functions and include them in the `helperFunctions` array in the response JSON.

9. **[DOM_ELEMENT_INTERACTION]**

10. **Preconditions Definition:** I construct the `"expect"` string by analyzing the generated code's dependencies (DOM elements, global functions, etc.). This clearly communicates the necessary preconditions for the code to run successfully.

11. **Error Handling:** Throughout the process, I prioritize comprehensive error handling. Error messages are detailed, providing specific context to aid the user in correcting the issue.

12. **[DATABASE_INTERACTION]**

13. **[CSS_CONSIDERATIONS]**

14. **[ACCESSIBILITY_CONSIDERATIONS]**

15. **[RESPONSIVENESS_CONSIDERATIONS]**

16. **[FORM_BUILDER_FUNCTION]**

17. **[FIELD_DEFINITION_PROCESSING]**
