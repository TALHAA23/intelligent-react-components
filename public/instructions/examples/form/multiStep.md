### Multi-steps form

The example shows how to handle multi-steps form. Multi-steps form are created when the input JSON has `multistep` property.

### Example 01 - A General example

**Input JSON**

```json
{
  "prompt": "Create a multi-step form",
  "listener": "onSubmit",
  "filename": "multiStepForm",
  "layout": "one-column",
  "styleHint": "Material Design",
  "validate": "Validate each step before proceeding.  Ensure all required fields are filled.",
  "fieldDefinitions": [
    {
      "id": "name",
      "fieldDefination": "Text input for the user's full name",
      "styleHint": "outlined",
      "layout": "full-width",
      "validate": "Required"
    },
    {
      "id": "email",
      "fieldDefination": "Email input for the user's email address",
      "styleHint": "outlined",
      "layout": "full-width",
      "validate": "Required; Must be a valid email address"
    },
    {
      "id": "phone",
      "fieldDefination": "Telephone input for the user's phone number",
      "styleHint": "outlined",
      "layout": "full-width",
      "validate": "Required"
    },
    {
      "id": "address",
      "fieldDefination": "Text input for the user's street address",
      "styleHint": "outlined",
      "layout": "full-width",
      "validate": "Required"
    },
    {
      "id": "city",
      "fieldDefination": "Text input for the user's city",
      "styleHint": "outlined",
      "layout": "full-width",
      "validate": "Required"
    },
    {
      "id": "postalCode",
      "fieldDefination": "Text input for the user's postal code",
      "styleHint": "outlined",
      "layout": "full-width",
      "validate": "Required"
    },
    {
      "id": "message",
      "fieldDefination": "Textarea for a longer message from the user",
      "styleHint": "outlined",
      "layout": "full-width",
      "validate": ""
    },
    {
      "id": "experience",
      "fieldDefination": "Text for user experience",
      "styleHint": "outlined",
      "layout": "full-width",
      "validate": ""
    },
    {
      "id": "skills",
      "fieldDefination": "Text input for user skills",
      "styleHint": "outlined",
      "layout": "full-width",
      "validate": ""
    }
  ],
  "multiStep": {
    "common": "Each step should have a clear heading and a progress indicator.  Use consistent styling for inputs and labels.",
    "steps": [
      {
        "title": "Personal Information",
        "fields": ["@name", "@email", "@phone"],
        "desc": "Collect basic contact information.",
        "validate": "All fields in this step are required."
      },
      {
        "title": "Address Information",
        "fields": ["@address", "@city", "@postalCode"],
        "desc": "Collect the user's address details.",
        "validate": "All fields in this step are required."
      },
      {
        "title": "Additional Information",
        "fields": ["@message", "@experience", "@skills"],
        "desc": "Gather any additional details, like a message and user's experience.",
        "styleHint": "Material Design",
        "validate": ""
      }
    ]
  }
}
```

**Output JSON**

```json
{
  "thoughts": "Create a clean, functional multi-step form with proper step navigation, form validation, improved styling, and correct submission handling.",
  "response": {
    "eventListener": "function main(event, args) {\n  event.preventDefault();\n\n  // Get the form data\n  const formData = new FormData(document.querySelector('.multiStepForm'));\n  const data = Object.fromEntries(formData.entries());\n\n  // Validate the form data before submission\n  const errors = validateForm(data);\n  if (errors.length > 0) {\n    setStatus(errors.join('\\n'), 'error');\n    return;\n  }\n\n  // Set loading state\n  setStatus('Processing your submission...', 'pending');\n  toggleButtonState(true, 'Submitting...');\n\n  // Simulate API call with timeout\n  setTimeout(() => {\n    // For demo purposes: trigger error if name is 'error'\n    console.log(data)\n    if (data['multiStepForm-name'].toLowerCase() === 'error') {\n      setStatus('Submission failed. Please try again.', 'error');\n      toggleButtonState(false, 'Submit');\n    } else {\n      console.log('Form submitted successfully:', data);\n      setStatus(\n        'Thank you! Your form has been submitted successfully.',\n        'success',\n      );\n      toggleButtonState(false, 'Done');\n      document.querySelector('.multiStepForm').reset();\n      showStep(1); // Reset to first step\n    }\n  }, 2000);\n}",
    "formBuilder": "function formBuilder(formElement, args) {\n  if (globals.isFormBuilt) return;\n\n  if (!(formElement instanceof HTMLFormElement)) {\n    console.error('Invalid form element. Expected HTMLFormElement.');\n    return;\n  }\n\n  formElement.classList.add('multiStepForm');\n\n  const header = createElement('div', {\n    classList: ['multiStepForm-header'],\n  });\n\n  const title = createElement('h2', {\n    textContent: 'Contact Form',\n    classList: ['multiStepForm-title'],\n  });\n\n  const statusContainer = createElement('div', {\n    id: 'multiStepForm-formStatus',\n    classList: ['multiStepForm-status'],\n  });\n\n  header.appendChild(title);\n  header.appendChild(statusContainer);\n  formElement.appendChild(header);\n\n  const progressBar = createElement('div', {\n    classList: ['multiStepForm-progress'],\n  });\n\n  const steps = [\n    { id: 1, label: 'Personal Info' },\n    { id: 2, label: 'Contact Details' },\n    { id: 3, label: 'Confirmation' },\n  ];\n\n  steps.forEach((step) => {\n    const stepElement = createElement('div', {\n      id: `multiStepForm-progress-step-${step.id}`,\n      classList: ['multiStepForm-progress-step', step.id === 1 ? 'active' : ''],\n    });\n\n    const stepNumber = createElement('div', {\n      classList: ['multiStepForm-progress-number'],\n      textContent: step.id,\n    });\n\n    const stepLabel = createElement('div', {\n      classList: ['multiStepForm-progress-label'],\n      textContent: step.label,\n    });\n\n    stepElement.appendChild(stepNumber);\n    stepElement.appendChild(stepLabel);\n    progressBar.appendChild(stepElement);\n\n    if (step.id < steps.length) {\n      const connector = createElement('div', {\n        classList: ['multiStepForm-progress-connector'],\n      });\n      progressBar.appendChild(connector);\n    }\n  });\n\n  formElement.appendChild(progressBar);\n\n  const formContent = createElement('div', {\n    classList: ['multiStepForm-content'],\n  });\n\n  const step1 = createFormStep(1, 'Personal Information');\n  step1.appendChild(createFormField('multiStepForm-name', 'Full Name', 'text', true));\n  step1.appendChild(createFormField('multiStepForm-email', 'Email Address', 'email', true));\n  step1.appendChild(createFormField('multiStepForm-phone', 'Phone Number', 'tel', true));\n\n  const step2 = createFormStep(2, 'Address Information');\n  step2.appendChild(createFormField('multiStepForm-address', 'Street Address', 'text', true));\n  step2.appendChild(createFormField('multiStepForm-city', 'City', 'text', true));\n  step2.appendChild(createFormField('multiStepForm-postalCode', 'Postal Code', 'text', true));\n\n  const step3 = createFormStep(3, 'Additional Information');\n  step3.appendChild(createFormField('multiStepForm-message', 'Your Message', 'textarea'));\n  step3.appendChild(createFormField('multiStepForm-experience', 'Experience', 'text'));\n  step3.appendChild(createFormField('multiStepForm-skills', 'Skills', 'text'));\n\n  formContent.appendChild(step1);\n  formContent.appendChild(step2);\n  formContent.appendChild(step3);\n  formElement.appendChild(formContent);\n\n  const buttonContainer = createElement('div', {\n    classList: ['multiStepForm-buttons'],\n  });\n\n  const prevButton = createElement('button', {\n    type: 'button',\n    textContent: 'Previous',\n    classList: ['multiStepForm-button', 'multiStepForm-prev-button'],\n    id: 'multiStepForm-prevButton',\n  });\n\n  const nextButton = createElement('button', {\n    type: 'button',\n    textContent: 'Next',\n    classList: ['multiStepForm-button', 'multiStepForm-next-button'],\n    id: 'multiStepForm-nextButton',\n  });\n\n  globals.submitButton = createElement('button', {\n    type: 'submit',\n    textContent: 'Submit',\n    classList: ['multiStepForm-button', 'multiStepForm-submit-button'],\n    id: 'multiStepForm-submitButton',\n  });\n\n  buttonContainer.appendChild(prevButton);\n  buttonContainer.appendChild(nextButton);\n  buttonContainer.appendChild(globals.submitButton);\n  formElement.appendChild(buttonContainer);\n\n  prevButton.addEventListener('click', () => {\n    if (globals.currentStep > 1) {\n      showStep(globals.currentStep - 1);\n    }\n  });\n\n  nextButton.addEventListener('click', () => {\n    if (validateCurrentStep(globals.currentStep)) {\n      if (globals.currentStep < 3) {\n        showStep(globals.currentStep + 1);\n      }\n    }\n  });\n\n  formElement.addEventListener('submit', (e) => main(e, args));\n\n  globals.isFormBuilt = true;\n  showStep(1);\n\n  function createFormStep(stepNumber, title) {\n    const stepContainer = createElement('div', {\n      id: `multiStepForm-step${stepNumber}`,\n      classList: [\n        'multiStepForm-step-container',\n        stepNumber === 1 ? 'active' : '',\n      ],\n    });\n\n    const stepTitle = createElement('h3', {\n      textContent: title,\n      classList: ['multiStepForm-step-title'],\n    });\n\n    stepContainer.appendChild(stepTitle);\n    return stepContainer;\n  }\n\n  function createFormField(name, label, type, required = false, options = []) {\n    const fieldContainer = createElement('div', {\n      classList: ['multiStepForm-field'],\n    });\n\n    const labelElement = createElement('label', {\n      htmlFor: name,\n      textContent: required ? `${label} *` : label,\n      classList: ['multiStepForm-label'],\n    });\n    fieldContainer.appendChild(labelElement);\n\n    if (type === 'textarea') {\n      const textarea = createElement('textarea', {\n        id: name,\n        name: name,\n        required: required,\n        classList: ['multiStepForm-input', 'multiStepForm-textarea'],\n      });\n      fieldContainer.appendChild(textarea);\n    } else if (type === 'select') {\n      const select = createElement('select', {\n        id: name,\n        name: name,\n        required: required,\n        classList: ['multiStepForm-input', 'multiStepForm-select'],\n      });\n\n      options.forEach((option) => {\n        const optionElement = createElement('option', {\n          value: option.value,\n          textContent: option.label,\n        });\n        select.appendChild(optionElement);\n      });\n      fieldContainer.appendChild(select);\n    } else {\n      const input = createElement('input', {\n        type: type,\n        id: name,\n        name: name,\n        required: required,\n        classList: ['multiStepForm-input'],\n      });\n      fieldContainer.appendChild(input);\n    }\n    return fieldContainer;\n  }\n}",
    "helperFunctions": [
      "function createElement(tag, props, children) {\n  if(!typeof props == 'object'){\n    console.error('props is not an object')\n    return\n  }\n  const element = document.createElement(tag);\n\n  // Apply properties to the element\n  Object.entries(props).forEach(([key, value]) => {\n    if (key === 'classList' && Array.isArray(value)) {\n      value.forEach(cls => cls && element.classList.add(cls));\n    } else if (key === 'style' && typeof value === 'object') {\n      Object.assign(element.style, value);\n    } else if (key === 'dataset' && typeof value === 'object') {\n      Object.entries(value).forEach(([dataKey, dataValue]) => {\n        element.dataset[dataKey] = dataValue;\n      });\n    } else if (key === 'attributes' && typeof value === 'object') {\n      Object.entries(value).forEach(([attrName, attrValue]) => {\n        element.setAttribute(attrName, attrValue);\n      });\n    } else {\n      element[key] = value;\n    }\n  });\n\n  // Append children\n  if (Array.isArray(children)) {\n    children.forEach(child => {\n      if (child instanceof Node) {\n        element.appendChild(child);\n      }\n    });\n  }\n\n  return element;\n}",
      "function showStep(stepNumber) {\n  // Update global current step\n  globals.currentStep = stepNumber;\n\n  // Hide all step containers\n  const stepContainers = document.querySelectorAll(\n    '.multiStepForm-step-container',\n  );\n\n  stepContainers.forEach((container) => {\n    container.classList.remove('active');\n  });\n\n  // Show current step container\n  const currentContainer = document.getElementById(`multiStepForm-step${stepNumber}`);\n  if (currentContainer) {\n    currentContainer.classList.add('active');\n  }\n\n  // Update progress indicators\n  const progressSteps = document.querySelectorAll(\n    '.multiStepForm-progress-step',\n  );\n  progressSteps.forEach((step, index) => {\n    const stepId = index + 1;\n    if (stepId < stepNumber) {\n      step.classList.add('completed');\n      step.classList.remove('active');\n    } else if (stepId === stepNumber) {\n      step.classList.add('active');\n      step.classList.remove('completed');\n    } else {\n      step.classList.remove('active', 'completed');\n    }\n  });\n\n  // Update connector lines\n  const connectors = document.querySelectorAll(\n    '.multiStepForm-progress-connector',\n  );\n  connectors.forEach((connector, index) => {\n    if (index + 1 < stepNumber) {\n      connector.classList.add('active');\n    } else {\n      connector.classList.remove('active');\n    }\n  });\n\n  // Update button visibility\n  const prevButton = document.getElementById('multiStepForm-prevButton');\n  const nextButton = document.getElementById('multiStepForm-nextButton');\n  const submitButton = document.getElementById('multiStepForm-submitButton');\n\n  if (prevButton && nextButton && submitButton) {\n    prevButton.style.display = stepNumber === 1 ? 'none' : 'inline-block';\n    nextButton.style.display = stepNumber === 3 ? 'none' : 'inline-block';\n    submitButton.style.display = stepNumber === 3 ? 'inline-block' : 'none';\n  }\n\n  // Clear any previous status messages\n  setStatus('', '');\n}",
      "function setStatus(message, type) {\n  const statusElement = document.getElementById('multiStepForm-formStatus');\n  if (!statusElement) return;\n\n  statusElement.textContent = message;\n  statusElement.className = 'multiStepForm-status';\n\n  if (type) {\n    statusElement.classList.add(`multiStepForm-status-${type}`);\n  }\n\n  // Scroll to status message if there's an error\n  if (type === 'error') {\n    statusElement.scrollIntoView({ behavior: 'smooth', block: 'center' });\n  }\n}",
      "function toggleButtonState(disabled, text) {\n  if (globals.submitButton) {\n    globals.submitButton.disabled = disabled;\n    if (text) {\n      globals.submitButton.textContent = text;\n    }\n  }\n}",
      "function validateCurrentStep(stepNumber) {\n  const currentStep = document.getElementById(`multiStepForm-step${stepNumber}`);\n  if (!currentStep) return true;\n\n  const requiredFields = currentStep.querySelectorAll('[required]');\n  let isValid = true;\n  let errorMessages = [];\n\n  requiredFields.forEach((field) => {\n    if (!field.value.trim()) {\n      isValid = false;\n      field.classList.add('multiStepForm-error');\n\n      // Get field label\n      const labelFor = document.querySelector(`label[for=\"${field.id}\"]`);\n      const fieldName = labelFor\n        ? labelFor.textContent.replace(' *', '')\n        : field.name;\n\n      errorMessages.push(`${fieldName} is required`);\n    } else {\n      field.classList.remove('multiStepForm-error');\n    }\n  });\n\n  // Show error message if validation fails\n  if (!isValid) {\n    setStatus(\n      `Please complete all required fields: ${errorMessages.join(', ')}`,\n      'error',\n    );\n  }\n\n  return isValid;\n}",
      "function validateForm(data) {\n  const errors = [];\n\n  // Validate required fields\n  if (!data['multiStepForm-name'] || !data['multiStepForm-name'].trim()) {\n    errors.push('Name is required');\n  }\n\n  if (!data['multiStepForm-email'] || !data['multiStepForm-email'].trim()) {\n    errors.push('Email is required');\n  } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(data['multiStepForm-email'])) {\n    errors.push('Email is not valid');\n  }\n\n  return errors;\n}"
    ],

    "globals": {
      "isFormBuilt": false,
      "submitButton": null,
      "currentStep": 1
    },

    "CSS": {
      "styles": "/* Base form styling */\n.multiStepForm {\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n  max-width: 700px;\n  margin: 40px auto;\n  background-color: #ffffff;\n  border-radius: 10px;\n  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);\n  padding: 30px;\n  color: #333;\n}\n\n/* Header */\n.multiStepForm-header {\n  margin-bottom: 30px;\n}\n\n.multiStepForm-title {\n  font-size: 24px;\n  color: #2c3e50;\n  margin: 0 0 15px 0;\n  text-align: center;\n}\n\n/* Progress bar */\n.multiStepForm-progress {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 40px;\n}\n\n.multiStepForm-progress-step {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n  z-index: 1;\n}\n\n.multiStepForm-progress-number {\n  width: 35px;\n  height: 35px;\n  border-radius: 50%;\n  background-color: #e9ecef;\n  color: #6c757d;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: bold;\n  margin-bottom: 8px;\n  transition: all 0.3s ease;\n}\n\n.multiStepForm-progress-label {\n  font-size: 14px;\n  color: #6c757d;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n\n.multiStepForm-progress-connector {\n  flex-grow: 1;\n  height: 3px;\n  background-color: #e9ecef;\n  margin: 0 10px;\n  position: relative;\n  top: -13px;\n  z-index: 0;\n  transition: background-color 0.3s ease;\n}\n\n.multiStepForm-progress-connector.active {\n  background-color: #3498db;\n}\n\n.multiStepForm-progress-step.active .multiStepForm-progress-number {\n  background-color: #3498db;\n  color: white;\n}\n\n.multiStepForm-progress-step.active .multiStepForm-progress-label {\n  color: #3498db;\n  font-weight: 600;\n}\n\n.multiStepForm-progress-step.completed .multiStepForm-progress-number {\n  background-color: #2ecc71;\n  color: white;\n}\n\n/* Form content */\n.multiStepForm-content {\n  margin-bottom: 30px;\n}\n\n.multiStepForm-step-container {\n  display: none;\n  animation: fadeIn 0.4s ease;\n}\n\n.multiStepForm-step-container.active {\n  display: block;\n}\n\n@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(10px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n.multiStepForm-step-title {\n  font-size: 18px;\n  margin-bottom: 20px;\n  color: #2c3e50;\n  padding-bottom: 10px;\n  border-bottom: 1px solid #eee;\n}\n\n/* Form fields */\n.multiStepForm-field {\n  margin-bottom: 20px;\n}\n\n.multiStepForm-label {\n  display: block;\n  margin-bottom: 8px;\n  font-weight: 500;\n  color: #4a5568;\n}\n\n.multiStepForm-input {\n  width: 100%;\n  padding: 12px 15px;\n  font-size: 15px;\n  border: 1px solid #ddd;\n  border-radius: 5px;\n  background-color: #f9fafb;\n  transition: border 0.3s, box-shadow 0.3s;\n}\n\n.multiStepForm-input:focus {\n  border-color: #3498db;\n  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);\n  outline: none;\n  background-color: #fff;\n}\n\n.multiStepForm-textarea {\n  min-height: 100px;\n  resize: vertical;\n}\n\n.multiStepForm-select {\n  appearance: none;\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23606F7B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\");\n  background-repeat: no-repeat;\n  background-position: right 10px center;\n  background-size: 16px;\n}\n\n.multiStepForm-checkbox-field {\n  margin-top: 25px;\n}\n\n.multiStepForm-checkbox-wrapper {\n  display: flex;\n  align-items: center;\n}\n\n.multiStepForm-checkbox {\n  margin-right: 10px;\n  width: 18px;\n  height: 18px;\n}\n\n.multiStepForm-checkbox-label {\n  font-size: 15px;\n  font-weight: normal;\n}\n\n/* Input validation */\n.multiStepForm-input.multiStepForm-error {\n  border-color: #e74c3c;\n  background-color: #fff8f8;\n}\n\n/* Status messages */\n.multiStepForm-status {\n  padding: 12px;\n  margin-bottom: 20px;\n  border-radius: 5px;\n  text-align: center;\n  display: none;\n}\n\n.multiStepForm-status:not(:empty) {\n  display: block;\n}\n\n.multiStepForm-status-error {\n  background-color: #fff5f5;\n  color: #e53e3e;\n  border: 1px solid #feb2b2;\n}\n\n.multiStepForm-status-success {\n  background-color: #f0fff4;\n  color: #38a169;\n  border: 1px solid #c6f6d5;\n}\n\n.multiStepForm-status-pending {\n  background-color: #ebf8ff;\n  color: #3182ce;\n  border: 1px solid #bee3f8;\n}\n\n/* Buttons */\n.multiStepForm-buttons {\n  display: flex;\n  justify-content: space-between;\n}\n\n.multiStepForm-button {\n  padding: 12px 20px;\n  border: none;\n  border-radius: 5px;\n  font-size: 16px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  min-width: 120px;\n}\n\n.multiStepForm-prev-button {\n  background-color: #f7fafc;\n  color: #4a5568;\n  border: 1px solid #e2e8f0;\n}\n\n.multiStepForm-prev-button:hover {\n  background-color: #edf2f7;\n}\n\n.multiStepForm-next-button {\n  background-color: #3498db;\n  color: white;\n  margin-left: auto;\n}\n\n.multiStepForm-next-button:hover {\n  background-color: #2980b9;\n}\n\n.multiStepForm-submit-button {\n  background-color: #2ecc71;\n  color: white;\n  margin-left: auto;\n}\n\n.multiStepForm-submit-button:hover {\n  background-color: #27ae60;\n}\n\n.multiStepForm-button:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n\n/* Responsive adjustments */\n@media (max-width: 768px) {\n  .multiStepForm {\n    padding: 20px;\n    margin: 20px;\n  }\n  \n  .multiStepForm-progress-label {\n    font-size: 12px;\n  }\n  \n  .multiStepForm-button {\n    min-width: 100px;\n    padding: 10px 15px;\n    font-size: 14px;\n  }\n}\n\n@media (max-width: 480px) {\n  .multiStepForm-progress-label {\n    display: none;\n  }\n  \n  .multiStepForm-buttons {\n    flex-direction: column;\n    gap: 10px;\n  }\n  \n  .multiStepForm-button {\n    width: 100%;\n  }\n  \n  .multiStepForm-next-button,\n  .multiStepForm-submit-button {\n    margin-left: 0;\n  }\n}"
    }
  },
  "expect": "Create an HTML element with a form class of 'testMultistep'. The form should include proper step functionality, validation, and improved styling."
}
```

_This is the only example on **Multisteps form** so be sure you learn a lot here and be able to handle any type of prompt in real use_
