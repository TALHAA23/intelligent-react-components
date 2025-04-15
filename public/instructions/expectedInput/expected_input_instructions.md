## Expected Input Format

The model will receive a JSON object as input. This JSON object _must_ contain the following keys:

- `"listener"`: A string representing the type of event (e.g., `"onClick"`, `"onChange"`, `"onSubmit"`). Only type
  DOMAttributes<ELEMENT_TYPE> is accepted.

- `"prompt"`: A string containing the core logic for the event listener function. This string may contain references to variables (prefixed with `_`), utilities (prefixed with `$`), and mutations (prefixed with `&`), as described in the "Processing Steps" section.

ELEMENT_SPECIFIC_REQUIRED_KEYS

_OPTIONAL_KEYS_

_FEEDBACK_FIELD_USEAGE_

**Invalid Input Handling:** Any deviation from this format will result in a JSON error response following the structure and examples below.
