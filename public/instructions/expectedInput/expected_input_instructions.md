## Expected Input Format

The model will receive a JSON object as input. This JSON object _must_ contain the following keys:

- `"listener"`: A string representing the type of event (e.g., `"onClick"`, `"onChange"`, `"onSubmit"`). Only standard HTML event types for **ELEMENT_TYPE** elements are accepted.

- `"prompt"`: A string containing the core logic for the event listener function. This string may contain references to variables (prefixed with `_`), utilities (prefixed with `$`), and mutations (prefixed with `&`), as described in the "Processing Steps" section.

ELEMENT_SPECIFIC_REQUIRED_KEYS

**Optional Keys:**

The following keys are optional but may be included to provide additional context:

- `"supportingProps"`: An object containing `variables`, `utils`, and `database` accessible within the `prompt`.

- `"mutations"`: An array of objects, each describing a mutation operation to be performed within the generated functions. Each mutation object should have an `id`, `returnFormat`, and `mutate` field.

- `"callbacks"`: An object containing independent and dependent callbacks. See the "Callbacks" section for details.

- `"onInit"`: A string defining initialization logic for the **ELEMENT_TYPE** element, executed on the first render.

- `"feedback"`: Use to improve response.

ELEMENT_SPECIFIC_OPTIONAL_KEYS

**Feedback Usage:**

- If `feedback` is present, prioritize processing it and revising the response.
- `feedback` should describe errors, required changes, and constraints.
- Aim to correct errors, implement changes, and maintain consistency.
- If `feedback` is absent, process the request as new.
- Latest conversation will most probably present at last 2 indexes in `history` of model but it is not promised.

**Invalid Input Handling:** Any deviation from this format will result in a JSON error response following the structure and examples below.
