### How to use `supportingProps.variables`

#### Example 1:

**Input JSON**

```json
{
  "prompt": "upon submission, form data with name age should be greater then _ageRestrictionTest.",
  "listener": "onSubmit",
  "filename": "ageValidation",
  "supportingProps": {
    "_ageRestrictionTest": 18
  }
}
```

**Output JSON**

```json
{
  "thoughts": "[THE_MODEL_THOUGHTS]",
  "response": {
    "eventListener": "function main(event, args) \n{ const formData = new FormData(event.currentTarget);\n const age = formData.get('age');\n if(!age) \n{ console.error('age field not find');\n return; }\n const validAge = +age >= args._ageRestrictionTest;\n if(validAge) \n{ do somethign} \nelse \n{do something else} }"
  },
  "expect": "The form should have a field name property set to 'age'"
}
```
