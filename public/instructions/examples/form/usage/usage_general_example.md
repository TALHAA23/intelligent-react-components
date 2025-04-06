### Some Examples that create complete working form

#### Example 1: Basic Contact Form

**Desciption:** This example demonstrates the generation of a simple contact form with basic fields (name, email, message). It showcases basic form structure creation using `prompt`, basic CSS styling, use of `formElement` argument and use of `globals` to avoid duplication. The prompt mainly focus of creating a form so the example focus more on `formBuilder` and include empty `eventListener` as no event handler is required.
**Input JSON**

```json
{
  "prompt": "Create a simple contact form with fields for name, email, and message.",
  "filename": "contactForm"
}
```

**Output JSON**

```json
{
  "thoughts": "The prompt requests a simple contact form with three fields: Name, Email, and Message. No event handler is descussed in the prompt so i will generate empty handler.",
  "response": {
    "eventListener": "function main(event, args) {\n    event.preventDefault();\n    console.log('Form Submitted');\n    }",
    "formBuilder": "function formBuilder(formElement, args) {\n  if(globals.isFormBuilded) return;\n\n  if (!(formElement instanceof HTMLFormElement)) {\n    console.warn('Invalid formElement provided. Expected an HTMLFormElement.');\n    return;\n  }\n\n  const createElement = (tag, options) => {\n    const element = document.createElement(tag);\n    Object.assign(element, options);\n    return element;\n  };\n\n  const nameField = createElement('input', {\n    type: 'text',\n    id: 'contactForm-name',\n    name: 'name',\n    placeholder: 'Enter your name',\n    classList: ['contactForm-input']\n  });\n\n  const emailField = createElement('input', {\n    type: 'email',\n    id: 'contactForm-email',\n    name: 'email',\n    placeholder: 'Enter your email',\n    classList: ['contactForm-input']\n  });\n\n  const messageField = createElement('textarea', {\n    id: 'contactForm-message',\n    name: 'message',\n    placeholder: 'Enter your message',\n    classList: ['contactForm-input']\n  });\n\n  const nameLabel = createElement('label', {\n    htmlFor: 'contactForm-name',\n    textContent: 'Name:',\n    classList: ['contactForm-label']\n  });\n\n  const emailLabel = createElement('label', {\n    htmlFor: 'contactForm-email',\n    textContent: 'Email:',\n    classList: ['contactForm-label']\n  });\n\n  const messageLabel = createElement('label', {\n    htmlFor: 'contactForm-message',\n    textContent: 'Message:',\n    classList: ['contactForm-label']\n  });\n\n  formElement.appendChild(nameLabel);\n  formElement.appendChild(nameField);\n  formElement.appendChild(emailLabel);\n  formElement.appendChild(emailField);\n  formElement.appendChild(messageLabel);\n  formElement.appendChild(messageField);\n\n  globals.isFormBuilded = true;\n}",
    "globals": {
      "isFormBuilded": false
    },
    "CSS": {
      "styles": "\n.contactForm {\n  max-width: 400px;\n  margin: 20px auto;\n  padding: 20px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.contactForm-label {\n  display: block;\n  margin-bottom: 5px;\n}\n\n.contactForm-input {\n  width: 100%;\n  padding: 10px;\n  margin-bottom: 15px;\n  border: 1px solid #ccc;\n  border-radius: 3px;\n}\n\n.contactForm-button {\n  background-color: #007bff;\n  color: #fff;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 3px;\n  cursor: pointer;\n}\n\n.contactForm-button:hover {\n  background-color: #0069d9;\n}"
    }
  },
  "expect": "The user do not need to do anything. everything will be handled internally."
}
```

#### Example 2: Form With Validation, Layout and Dynamic behaviour

**Description:** This example demonstrates the creation of a Job Application form with basic validation, dynamic field updates, and a specific layout. The example shows how to use both `validate` and `fieldDefinitions[].validate` to write validation rules. The Output JSON shows how the model should generate CSS for the form using .[filename] to style the model even though the generated code does not create it.

**Input JSON:**

```json
{
  "prompt": "A Job Application form. Each field should show a small error message if invalid. Error message must be shown only after the input is focus (interacted). The form should have an appropriate name so the user know what they are filling. The form should show Error and Submitting status. Upon submission format the data according to $DataFormat and console it",
  "supportingProps": {
    "utils": {
      "DataFormat": {
        "fistName": "first name",
        "lastname": "last name",
        "fullName": "concat first and last name",
        "email": "The email",
        "emailDomain": "extract domain from email",
        "employmentStatus": "status",
        "position": "The selected position",
        "submissionDate": "The time and data of submission"
      }
    }
  },
  "fieldDefinitions": [
    {
      "id": "firstName",
      "fieldDefination": "Input field for First name.",
      "validate": "Must be capitalize"
    },
    {
      "fieldDefination": "Input field for Last name. Enable only if @firstName is filled",
      "validate": "Must be capitalize"
    },
    {
      "fieldDefination": "Email field",
      "validate": "must be valid email"
    },
    {
      "fieldDefination": "A dropdown/select with options: 'Software Engineer', 'Data Scientist', 'Project Manager', 'Marketing Specialist'. Default value set to 'Select Job Position'."
    },
    {
      "fieldDefination": "Radio buttons for current employment status. Options: 'Employed', 'Unemployed', 'Freelancer'"
    }
  ],
  "layout": "The form should have a two-column layout for the first row. The remaining fields should span the full width of the form. For sm screen (<350) use only one column layout",
  "styleHint": "The form should have a clean and professional look with a subtle gray background. The labels should be concise and aligned to the left. The input fields should have rounded corners and a slight shadow. If any input is valid use specific styling for error indication. Choose appropriate styling for form error and loading messages. Any error message above any input must be small and styled perfectly with the input. Max width 700px, centered horizontally ",
  "validate": "All fields are required. Upson submission validate all the data once again. If any error show the error inside the form."
}
```

**Output JSON**

```json
{
  "thoughts": "This prompt requests a Job Application form with dynamic field updates, input validation, error handling, data formatting, and specific layout and styling preferences. The `supportingProps` provides a `DataFormat` object for data transformation.",
  "response": {
    "eventListener": "function main(event, args) {\n    event.preventDefault();\n    setStatus(\"\", \"\");\n    toggleButtonState(true, 'Submitting...');\n    const isValid = validateForm();\n    if (!isValid) {\n      setStatus('Error: Please fix the highlighted errors.', 'error');\n      toggleButtonState(false, 'Submit');\n\n      return;\n    }\n    const formData = formatFormData();\n    console.log(formData);\n    setStatus('Submitted successfully!', 'success');\n    toggleButtonState(false, 'Submit');\n  }",
    "formBuilder": "function formBuilder(formElement, args) {\n    if (globals.isFormBuilded) return;\n    if (!(formElement instanceof HTMLFormElement)) {\n      console.warn(\n        'Invalid formElement provided. Expected an HTMLFormElement.'\n      );\n      return;\n    }\n\n    const heading = createElement('h1', {\n      textContent: 'Job Application Form',\n      classList: ['formHeading'],\n    });\n\n    formElement.appendChild(heading);\n    const statusDiv = createElement('div', {\n      id: 'multiStepForm-formStatus',\n      classList: ['multiStepForm-formStatus'],\n    });\n\n    formElement.appendChild(statusDiv);\n    const row1 = createElement('div', {\n       classList: ['formRow'] \n     });\n\n    ['firstName', 'lastName'].map((item) => {\n      // create a wrapper to error message is layout correctly\n      const wrapper = createElement('div');\n      globals[`${item}Ref`] = createElement('input', {\n        type: 'text',\n        id: `jobApplicationForm-${item}`,\n        name: 'firstName',\n        // capitalize placeholder\n        placeholder: item\n          .replace(/([A-Z])/g, ' $1')\n          .replace(/^./, (str) => str.toUpperCase()),\n        classList: ['jobApplicationForm-input'],\n        required: true,\n        disabled: item == 'lastName',\n      });\n      wrapper.appendChild(globals[`${item}Ref`]);\n      globals[`${item}Ref`].addEventListener('blur', () =>\n        validateField(globals[`${item}Ref`], 'Must be capitalize')\n      );\n      row1.appendChild(wrapper);\n    });\n\n    // enable last name if first name\n    globals.firstNameRef?.addEventListener('input', (e) => {\n      if (globals.lastNameRef) globals.lastNameRef.disabled = !e.target.value;\n    });\n\n    formElement.appendChild(row1);\n    globals.emailRef = createElement('input', {\n      type: 'email',\n      id: 'jobApplicationForm-email',\n      name: 'email',\n      placeholder: 'Email Address',\n      classList: ['jobApplicationForm-input'],\n      required: true,\n    });\n    globals.emailRef.addEventListener('blur', () =>\n      validateField(globals.emailRef, 'Must be a valid email address')\n    );\n    formElement.appendChild(globals.emailRef);\n    globals.positionRef = createElement('select', {\n      id: 'jobApplicationForm-position',\n      name: 'position',\n      classList: ['jobApplicationForm-select'],\n    });\n    const defaultOption = createElement('option', {\n      textContent: 'Select Job Position',\n    });\n    defaultOption.value = '';\n    defaultOption.selected = true;\n    globals.positionRef.appendChild(defaultOption);\n    [\n      'Software Engineer',\n      'Data Scientist',\n      'Project Manager',\n      'Marketing Specialist',\n    ].forEach((optionText) => {\n      const option = createElement('option', { textContent: optionText });\n      option.value = optionText;\n      globals.positionRef.appendChild(option);\n    });\n    formElement.appendChild(globals.positionRef);\n\n    const radioGroupContainer = createElement('div', {\n      classList: ['jobApplicationForm-radioGroup'],\n    });\n\n    const radioLabel = createElement('h1', {\n      textContent: 'Current Employment Status',\n      classList: ['radioGroupLabel'],\n    });\n    radioGroupContainer.appendChild(radioLabel);\n    globals.employmentStatusRef = [];\n    ['Employed', 'Unemployed', 'Freelancer'].forEach((option) => {\n      const radioContainer = createElement('div', {\n        classList: ['radioInline'],\n      });\n      const radio = createElement('input', {\n        type: 'radio',\n        id: `jobApplicationForm-employmentStatus-${option.toLowerCase()}`,\n        name: 'employmentStatus',\n        value: option,\n      });\n      const label = createElement('label', {\n        textContent: option,\n        htmlFor: `jobApplicationForm-employmentStatus-${option.toLowerCase()}`,\n      });\n      radioContainer.appendChild(radio);\n      radioContainer.appendChild(label);\n      radioGroupContainer.appendChild(radioContainer);\n      globals.employmentStatusRef.push(radio);\n    });\n    formElement.appendChild(radioGroupContainer);\n    globals.submitButtonRef = createElement('button', {\n      type: 'submit',\n      textContent: 'Submit',\n      classList: ['jobApplicationForm-submit'],\n    });\n    formElement.appendChild(globals.submitButtonRef);\n    globals.isFormBuilded = true;\n  }",
    "helperFunctions": [
      "function createElement(tag, options) {\n        const element = document.createElement(tag);\n        // Handle dataset separately\n        if (options.dataset) {\n          for (const key in options.dataset) {\n            if (options.dataset.hasOwnProperty(key)) {\n              element.dataset[key] = options.dataset[key];\n            }\n          }\n        delete options.dataset; // Remove dataset from options to prevent Object.assign error.\n      }\n    Object.assign(element, options);\n    return element;\n  }",
      "function validateField(field, validationRule) {\n    let isValid = true;\n    let message = \"\";\n    if (!field.value.trim()) {\n      isValid = false;\n      message = 'This field is required.';\n    } else {\n      if (validationRule === 'Must be capitalize') {\n        isValid = field.value[0] === field.value[0].toUpperCase();\n        if (!isValid) message = 'First letter must be capitalized.';\n      } else if (validationRule === 'Must be a valid email address') {\n        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n        isValid =  emailRegex.test(field.value);\n        if (!isValid) message = 'Invalid email format.';\n      }\n    }\n    let errorElem = field.parentNode.querySelector(\n      '.jobApplicationForm-errorMessage'\n    );\n    if (!errorElem) {\n      errorElem = createElement('div', {\n        classList: ['jobApplicationForm-errorMessage'],\n      });\n      field.parentNode.appendChild(errorElem);\n    }\n    errorElem.textContent = isValid ? \"\" : message;\n    return isValid;\n  }",
      "function validateForm() {\n    let valid = true;\n    valid = validateField(globals.firstNameRef, 'Must be capitalize') && valid;\n    valid = validateField(globals.lastNameRef, 'Must be capitalize') && valid;\n    valid =\n      validateField(globals.emailRef, 'Must be a valid email address') && valid;\n    valid = globals.positionRef.value.trim() !== '' && valid;\n    const radioChecked = globals.employmentStatusRef.some(\n      (radio) => radio.checked\n    );\n    if (!radioChecked) {\n      valid = false;\n      let radioError = document.querySelector(\n        '.jobApplicationForm-radioGroup .jobApplicationForm-errorMessage'\n      );\n      if (!radioError) {\n        radioError = createElement('div', {\n          classList: ['jobApplicationForm-errorMessage'],\n        });\n        document\n          .querySelector('.jobApplicationForm-radioGroup')\n          .appendChild(radioError);\n      }\n      radioError.textContent = 'Please select your employment status.';\n    } else {\n      const radioError = document.querySelector(\n        '.jobApplicationForm-radioGroup .jobApplicationForm-errorMessage'\n      );\n      if (radioError) radioError.textContent = \"\";\n    }\n    return valid;\n  }",
      "function formatFormData() {\n    const firstName = globals.firstNameRef.value.trim();\n    const lastName = globals.lastNameRef.value.trim();\n    const email = globals.emailRef.value.trim();\n    const position = globals.positionRef.value;\n    const employmentStatus = globals.employmentStatusRef.find(\n      (radio) => radio.checked\n    ).value;\n    return {\n      firstName,\n      lastName,\n      fullName: `${firstName} ${lastName}`,\n      email,\n      emailDomain: email.split('@')[1] || \"\",\n      status: employmentStatus,\n      position,\n      submissionDate: new Date().toLocaleString(),\n    };\n  }",
      " function setStatus(message, type) {\n    const statusDiv = document.getElementById('multiStepForm-formStatus');\n    statusDiv.textContent = message;\n    statusDiv.className = 'multiStepForm-formStatus ' + type;\n  }",
      "function toggleButtonState(disabled, text) {\n    if (!globals.submitButtonRef instanceof HTMLButtonElement) return;\n    globals.submitButtonRef.disabled = disabled;\n    globals.submitButtonRef.textContent = text;\n  }"
    ],
    "globals": {
      "isFormBuilded": false,
      "firstNameRef": null,
      "lastNameRef": null,
      "emailRef": null,
      "positionRef": null,
      "employmentStatusRef": null,
      "submitButtonRef": null
    },
    "CSS": {
      "styles": "\n      .jobApplicationForm {\n          max-width: 700px;\n          margin: 20px auto;\n          padding: 30px;\n          background-color: #f2f2f2;\n          border-radius: 10px;\n          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\n        }\n\n      .jobApplicationForm-row {\n          display: flex;\n          justify-content: space-between;\n          gap: 20px;\n        }\n\n      .jobApplicationForm-input,\n      .jobApplicationForm-select {\n          width: 100%;\n          padding: 15px;\n          margin-bottom: 20px;\n          border: 1px solid #ccc;\n          border-radius: 5px;\n          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n        }\n\n      .jobApplicationForm-radioGroup {\n          display: flex;\n          flex-direction: column;\n          gap: 10px;\n        }\n\n      .jobApplicationForm-submit {\n          background-color: #007bff;\n          color: #fff;\n          padding: 15px 30px;\n          border: none;\n          border-radius: 5px;\n          cursor: pointer;\n          transition: background-color 0.3s ease;\n        }\n\n      .jobApplicationForm-submit:hover {\n          background-color: #0056b3;\n        }\n\n      .jobApplicationForm-errorMessage {\n          color: #dc3545;\n          font-size: 12px;\n          margin-top: 5px;\n        }\n\n        @media (max-width: 350px) {\n        .jobApplicationForm-row {\n            flex-direction: column;\n          }\n\n        .jobApplicationForm-input,\n        .jobApplicationForm-select {\n            width: 100%;\n          }\n        }\n      "
    }
  },
  "expect": "A Job Application form with dynamic field updates, input validation, error handling, data formatting, and specific layout and styling preferences. The form should show Error and Submitting status. Upon submission format the data according to $DataFormat and console it."
}
```
