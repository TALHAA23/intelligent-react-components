## A Big Example

**Desciption:** This example teaches a model to understand how to generate interactive multi-step forms from a declarative JSON structure. The model learns to interpret JSON definitions for form fields, including their types, labels, validation rules, and conditional display logic. It grasps the concept of breaking down a form into steps with a progress indicator and handling navigation between them. Furthermore, the model observes how to implement client-side validation and provide user feedback through error messages.

**Input JSON:**

```json
{
  "prompt": "Create a multi-step event registration form. Implement a progress bar to visually guide the user through the multi-step process. Ensure the form adapts well to different screen sizes. Handle form submission and data formatting as per the provided `$DataFormat`. Display clear and concise error messages for invalid inputs. The form should have a clean and professional look.",
  "supportingProps": {
    "utils": {
      "DataFormat": {
        "eventId": "event ID",
        "eventDateTime": "event date and time",
        "eventLocation": "event location",
        "promoCode": "promo code",
        "groupDiscountCode": "group discount code",
        "isGroupRegistration": "group registration",
        "ticketType": "ticket types and quantities",
        "addOns": "selected add-ons",
        "donationAmount": "donation amount",
        "attendeeFirstName": "attendee first name",
        "attendeeLastName": "attendee last name",
        "attendeeEmail": "attendee email",
        "attendeeAge": "attendee age",
        "attendeePhone": "attendee phone",
        "attendeeDietaryRestrictions": "attendee dietary restrictions",
        "emergencyContactName": "emergency contact name",
        "emergencyContactPhone": "emergency contact phone",
        "customFields": "custom fields",
        "paymentInformation": "payment information",
        "termsAndConditions": "terms and conditions",
        "newsletterSignup": "newsletter signup",
        "referralCode": "referral code",
        "submissionDate": "The time and data of submission"
      }
    }
  },
  "fieldDefinitions": [
    {
      "id": "eventId",
      "fieldDefination": "Select an Event (Required, Dropdown with options: Summer Music Festival, Tech Conference 2024, Art Exhibition Opening Night, Charity Gala Dinner, Kids' Science Fair)"
    },
    {
      "id": "eventDateTime",
      "fieldDefination": "Select Event Date and Time (Required)."
    },
    {
      "id": "eventLocation",
      "fieldDefination": "Event Location (Display Only)"
    },
    {
      "id": "promoCode",
      "fieldDefination": "Enter Promo Code (Optional)"
    },
    {
      "id": "groupDiscountCode",
      "fieldDefination": "Enter Group Discount Code (Optional, appears if '@isGroupRegistration' is checked)"
    },
    {
      "id": "isGroupRegistration",
      "fieldDefination": "Group Registration (Checkbox)"
    },
    {
      "id": "ticketType",
      "fieldDefination": "Select Ticket Type (Required): General Admission, VIP, Early Bird, Student, Child, Senior Citizen"
    },
    {
      "id": "ticketQuantity",
      "fieldDefination": "Enter Quantity (number)"
    },
    {
      "id": "addOns",
      "fieldDefination": "Select Add-ons (Optional, Checkboxes): Event T-shirt, Parking Pass, Backstage Access, Early Access to Venue, Commemorative Program, Meet & Greet with Artists"
    },
    {
      "id": "donationAmount",
      "fieldDefination": "Enter Donation Amount (Optional, Number), Beside the input should have a '$' sign"
    },
    {
      "id": "attendeeFirstName",
      "fieldDefination": "Enter First Name (Required)"
    },
    {
      "id": "attendeeLastName",
      "fieldDefination": "Enter Last Name (Required)"
    },
    {
      "id": "attendeeEmail",
      "fieldDefination": "Enter Email Address (Required). Must be a valid email address."
    },
    {
      "id": "attendeeAge",
      "fieldDefination": "Enter Age (Show only if @ticketType is 'child', 'senior')",
      "validate": "child must be under 12 year old, senior must be 65 or older"
    },
    {
      "id": "attendeePhone",
      "fieldDefination": "Enter Phone Number (Optional)"
    },
    {
      "id": "attendeeDietaryRestrictions",
      "fieldDefination": "Enter Dietary Restrictions (Optional, Dropdown: None, Vegetarian, Vegan, Gluten-Free, Dairy-Free, Nut Allergy, Other)"
    },
    {
      "id": "emergencyContactName",
      "fieldDefination": "Enter Emergency Contact Name"
    },
    {
      "id": "emergencyContactPhone",
      "fieldDefination": "Enter Emergency Contact Phone"
    },
    {
      "id": "tshirtSize",
      "fieldDefination": "Select T-shirt Size (Appears if 'Event T-shirt' add-on is selected, Dropdown: S, M, L, XL, XXL)"
    },
    {
      "id": "companyName",
      "fieldDefination": "Enter Company Name (Optional, Appears for Corporate Events/VIP tickets)"
    },
    {
      "id": "workshopSelection",
      "fieldDefination": "Select Workshop (Appears if event has workshops, Dropdown with options: Music Production Basics, Songwriting Workshop, Stage Presence and Performance)"
    },
    {
      "id": "paymentInformation",
      "fieldDefination": "Enter Payment Information"
    },
    {
      "id": "termsAndConditions",
      "fieldDefination": "Accept Terms and Conditions (Required Checkbox), Beside a link redirecting to '/term-and-conditions'"
    },
    {
      "id": "newsletterSignup",
      "fieldDefination": "Subscribe to Newsletter (Optional Checkbox)"
    },
    {
      "id": "referralCode",
      "fieldDefination": "Enter Referral Code (Optional)"
    }
  ],
  "multiStep": {
    "steps": [
      {
        "title": "Event Information",
        "fields": [
          "eventId",
          "eventDateTime",
          "eventLocation",
          "promoCode",
          "isGroupRegistration",
          "groupDiscountCode"
        ],
        "validate": "Event, date/time, and promo code (if applicable) are required. Validate promo code against a list of valid codes.",
        "layout": "Two columns for event selection and date/time picker. Promo code and group registration fields in a separate row."
      },
      {
        "title": "Ticket Selection",
        "fields": ["ticketType", "addOns", "donationAmount"],
        "desc": "Select ticket types, add-ons, and make a donation (optional).",
        "validate": "Ticket type and quantity must be selected. Donation amount (if entered) must be a valid number.",
        "styleHint": "Display ticket types with clear pricing and quantity selectors. Use checkboxes or dropdowns for add-ons. Display the total price dynamically."
      },
      {
        "title": "Attendee Information",
        "fields": [
          "attendeeFirstName",
          "attendeeLastName",
          "attendeeEmail",
          "attendeeAge",
          "attendeePhone",
          "attendeeDietaryRestrictions",
          "emergencyContactName",
          "emergencyContactPhone",
          "customFields"
        ],
        "desc": "Enter information for all attendees. Custom fields will appear dynamically based on the selected ticket type and add-ons.",
        "validate": "All required fields for each attendee must be filled. Email addresses must be valid.",
        "layout": "Use a dynamic form to add/remove attendees as needed."
      },
      {
        "title": "Payment & Confirmation",
        "fields": [
          "paymentInformation",
          "termsAndConditions",
          "newsletterSignup",
          "referralCode"
        ],
        "desc": "Review order summary, enter payment information, and accept terms and conditions.",
        "validate": "Terms and Conditions must be accepted. Validate payment information (this will be handled separately in the actual implementation).",
        "styleHint": "Display a clear order summary with itemized costs. Integrate with a payment gateway for secure payment processing."
      }
    ]
  },
  "validate": "Upon submission, revalidate all the data against the rules described for each field.",
  "styleHint": "The form should have a clean and professional look. The labels should be concise and aligned to the left. The input fields should have rounded corners and a slight shadow. If any input is valid use specific styling for error indication. Choose appropriate styling for form error and loading messages. Any error message above any input must be small and styled perfectly with the input. Max width 700px, centered on the screen. Implement a progress bar to visually guide the user through the multi-step process. Number inputs by default have arrows make sure to hide them. On small screen (<480) one-column layout MUST be followed."
}
```

**Output JSON:**

```json
{
   "thoughts": "The user wants a multi-step event registration form with a progress bar, responsive design, validation, and data formatting. The form is divided into four steps: Event Information, Ticket Selection, Attendee Information, and Payment & Confirmation. Each step has specific fields and validation rules. The form should be styled professionally and handle errors effectively.",
  "response":{
    "eventListener":"function main(event, args) {
    event.preventDefault();
    setStatus("", "");
    toggleButtonState(true, 'Submitting...');

    if (!validateCurrentStep()) {
      setStatus('Please fix errors in the current step.', 'error');
      toggleButtonState(false, 'Next'); // Reset button for current step
      return;
    }

    if (globals.currentStep < globals.steps.length) {
      globals.currentStep++;
      updateProgressBar();
      showStep(globals.currentStep);
      toggleButtonState(false, 'Next'); // Prepare button for next step
      return;
    }

    if (!validateForm()) {
      setStatus('Please fix all form errors.', 'error');
      toggleButtonState(false, 'Submit'); // Reset button for final submit
      showStep(globals.steps.length); // Ensure last step is visible
      return;
    }
    const formData = formatFormData(args.DataFormat);
    console.log('Formatted Form Data:', formData);
    setStatus('Registration Successful!', 'success');
    toggleButtonState(false, 'Submit'); // Reset button after successful submission
  }
",
    "formBuilder":"function formBuilder(formElement, args) {
    if (globals.isFormBuilded) return;

    if (!(formElement instanceof HTMLFormElement)) {
      console.warn(
        'Invalid formElement provided. Expected an HTMLFormElement.'
      );
      return;
    }

    formElement.classList.add('eventRegistrationForm');

    formElement.append(
      createElement('h1', {
        textContent: 'Event Registration',
        classList: 'eventRegistrationForm-form-heading',
      }),
      createProgressBar(globals.steps),
      createElement('div', { id: 'formStatus', className: 'formStatus' }),
      ...createFormSteps(globals.steps, formElement), // Spread operator
      createButtonContainer()
    );
    showStep(globals.currentStep);
    // manage connections between dependent and dependency
    [
      [
        'change',
        globals.isGroupRegistrationRef,
        globals.groupDiscountCodeRef,
        (e) => e.currentTarget.checked,
      ],
      ['change', globals.ticketTypeRef, globals.attendeeAgeRef, /child|senior/],
      ['change', globals.ticketTypeRef, globals.companyNameRef, /vip/],
      [
        'change',
        Array.from(globals.addOnsRefs).find(
          (el) => el.id == 'eventRegistrationForm-addOns-EventT-shirt'
        ),
        globals.tshirtSizeRef,
        (e) => e.currentTarget.checked,
      ],
    ].forEach(([eventType, criteriaElement, affectedElement, condition]) =>
      manageConnection(eventType, criteriaElement, affectedElement, condition)
    );
    globals.isFormBuilded = true;
  }
"
  },
  "helperFunctions":[
    "function createElement(tag, options = {}) {
    const element = document.createElement(tag);
    Object.assign(element, options);
    return element;
  }

 "," function createField(fieldDefinition, formStep) {
    const fieldContainer = createElement('div', {
      // By default hide all field that depend on other as desc in input JSON.
      className: /attendeeAge|groupDiscountCode|tshirtSize|companyName/.test(
        fieldDefinition.id
      )
        ? 'eventRegistrationForm-hidden'
        : '',
    });
    const label = createElement('label', {
      htmlFor: `eventRegistrationForm-${fieldDefinition.id}`,
      textContent: fieldDefinition.fieldDefination + ':', // Corrected typo here
      className: 'eventRegistrationForm-form-label',
    });

    let input;

    switch (fieldDefinition.id) {
      case 'eventId':
      case 'ticketType':
        input = createSelectWithOptions(
          fieldDefinition.id,
          fieldDefinition.id === 'eventId'
            ? [
                'Summer Music Festival',
                'Tech Conference 2024',
                'Art Exhibition Opening Night',
                'Charity Gala Dinner',
                'Kids' Science Fair',
              ]
            : [
                'General Admission',
                'VIP',
                'Early Bird',
                'Student',
                'Child',
                'Senior Citizen',
              ]
        );
        break;

      case 'eventDateTime':
        input = createElement('input', {
          type: 'datetime-local',
          ...getDefaultInputProps(fieldDefinition),
          required: true,
        });
        break;

      case 'eventLocation':
        input = createElement('input', {
          type: 'text',
          ...getDefaultInputProps(fieldDefinition),
          readOnly: true,
          value: 'To be determined',
        });
        break;

      case 'promoCode':
      case 'referralCode':
        input = createElement('input', {
          type: 'text',
          ...getDefaultInputProps(fieldDefinition),
        });
        break;

      case 'groupDiscountCode':
        input = createElement('input', {
          type: 'text',
          ...getDefaultInputProps(fieldDefinition),
          disabled: !globals.isGroupRegistrationRef?.checked,
        });
        break;

      case 'isGroupRegistration':
        input = createElement('input', {
          type: 'checkbox',
          ...getDefaultInputProps(fieldDefinition),
        });
        input.addEventListener('change', () => {
          if (globals.groupDiscountCodeRef) {
            globals.groupDiscountCodeRef.disabled = !input.checked;
          }
        });
        break;

      case 'ticketQuantity':
      case 'attendeeAge':
        input = createElement('input', {
          type: 'number',
          ...getDefaultInputProps(fieldDefinition),
          min: 1,
        });
        break;

      case 'addOns':
        input = createAddOnOptions();
        break;

      case 'donationAmount':
        input = createInputGroup('number', '$', {
          step: '0.01',
          min: '0',
          ...getDefaultInputProps(fieldDefinition),
        });
        break;

      case 'attendeeFirstName':
      case 'attendeeLastName':
      case 'companyName':
        input = createElement('input', {
          type: 'text',
          ...getDefaultInputProps(fieldDefinition),
          required: fieldDefinition.id == 'companyName' ? false : true,
        });
        break;

      case 'attendeeEmail':
        input = createElement('input', {
          type: 'email',
          ...getDefaultInputProps(fieldDefinition),
          required: true,
        });
        break;

      case 'tshirtSize':
      case 'workshopSelection':
        input = createSelectWithOptions(
          fieldDefinition.id, // Or use specific options if needed
          fieldDefinition.id === 'tshirtSize'
            ? ['S', 'M', 'L', 'XL', 'XXL']
            : fieldDefinition.id === 'workshopSelection'
            ? [
                'Music Production Basics',
                'Songwriting Workshop',
                'Stage Presence and Performance',
              ]
            : []
        );
        break;

      case 'attendeePhone':
        input = createElement('input', {
          type: 'tel',
          ...getDefaultInputProps(fieldDefinition),
        });
        break;

      case 'attendeeDietaryRestrictions':
        input = createSelectWithOptions(fieldDefinition.id, [
          'None',
          'Vegetarian',
          'Vegan',
          'Gluten-Free',
          'Dairy-Free',
          'Nut Allergy',
          'Other',
        ]);
        break;

      case 'emergencyContactName':
      case 'emergencyContactPhone':
        input = createElement('input', {
          type: fieldDefinition.id === 'emergencyContactPhone' ? 'tel' : 'text',
          ...getDefaultInputProps(fieldDefinition),
        });
        break;

      case 'paymentInformation':
        input = createElement('textarea', {
          ...getDefaultInputProps(fieldDefinition),
          placeholder: 'Enter payment details here securely',
        });
        break;

      case 'termsAndConditions':
        input = createTermsAndConditions();
        break;

      case 'newsletterSignup':
        input = createElement('input', {
          type: 'checkbox',
          ...getDefaultInputProps(fieldDefinition),
        });
        break;

      default:
        input = createElement('input', {
          type: 'text',
          ...getDefaultInputProps(fieldDefinition),
        });
    }

    // Assign refs.  Consolidated using bracket notation.
    if (
      fieldDefinition.id !== 'addOns' &&
      fieldDefinition.id !== 'termsAndConditions'
    ) {
      // Exclude addOns and terms from ref assignment
      globals[`${fieldDefinition.id}Ref`] = input;
    } else if (fieldDefinition.id === 'addOns') {
      globals.addOnsRefs = input.querySelectorAll('input[type='checkbox']'); // Get checkboxes
    } else if (fieldDefinition.id === 'termsAndConditions') {
      globals.termsAndConditionsRef = input.querySelector(
        'input[type='checkbox']'
      ); // Get checkbox
    }

    fieldContainer.appendChild(label);
    fieldContainer.appendChild(input);
    formStep.appendChild(fieldContainer);
    return fieldContainer;
  }

 ',' function createSelectWithOptions(id, options) {
    const selectContainer = createElement('div', {
      className: 'eventRegistrationForm-form-select-container',
    });

    const select = createElement('select', {
      id: `eventRegistrationForm-${id}`,
      name: id,
      className: 'eventRegistrationForm-form-select',
      required:
        id === 'eventId' ||
        id === 'ticketType' ||
        id === 'attendeeDietaryRestrictions',
    });

    const fragment = document.createDocumentFragment();
    options.forEach((optionText) => {
      const option = createElement('option', {
        value: optionText,
        textContent: optionText,
      });
      fragment.appendChild(option);
    });
    select.appendChild(fragment);

    const arrow = createElement('div', {
      className: 'eventRegistrationForm-form-select-arrow',
    });

    selectContainer.appendChild(select);
    selectContainer.appendChild(arrow);
    // create ref from here to avoid creating ref to container
    globals[`${id}Ref`] = select;

    return select;
  }

 "," function getDefaultInputProps(fieldDefinition) {
    return {
      id: `eventRegistrationForm-${fieldDefinition.id}`,
      name: fieldDefinition.id,
      classList: ['eventRegistrationForm-form-input'],
    };
  }

 "," function createAddOnOptions() {
    const container = createElement('div', {
      classList: ['eventRegistrationForm-form-addons-container'],
    });
    const addOnsOptions = [
      'Event T-shirt',
      'Parking Pass',
      'Backstage Access',
      'Early Access to Venue',
      'Commemorative Program',
      'Meet & Greet with Artists',
    ];

    // Use document fragment for better performance
    const fragment = document.createDocumentFragment();
    addOnsOptions.forEach((optionText) => {
      const addonContainer = createElement('div', {
        classList: ['eventRegistrationForm-form-addon-item'],
      });
      const checkbox = createElement('input', {
        type: 'checkbox',
        id: `eventRegistrationForm-addOns-${optionText.replace(/\s+/g, '')}`,
        name: 'addOns',
        value: optionText,
        classList: ['eventRegistrationForm-form-checkbox'],
      });
      const addonLabel = createElement('label', {
        htmlFor: `eventRegistrationForm-addOns-${optionText.replace(
          /\\s+/g,
          ''
        )}`,
        textContent: optionText,
        classList: ['eventRegistrationForm-form-addon-label'],
      });
      addonContainer.appendChild(checkbox);
      addonContainer.appendChild(addonLabel);
      fragment.appendChild(addonContainer);
    });
    container.appendChild(fragment);
    return container;
  }

 "," function createInputGroup(inputType, prefix, inputProps) {
    const container = createElement('div', {
      classList: ['eventRegistrationForm-form-input-group'],
    });
    const prefixSpan = createElement('span', {
      textContent: prefix,
      classList: ['eventRegistrationForm-form-input-prefix'],
    });
    const input = createElement('input', { type: inputType, ...inputProps });
    container.appendChild(prefixSpan);
    container.appendChild(input);
    return container;
  }
 "," function createTermsAndConditions() {
    const container = createElement('div', {
      classList: ['eventRegistrationForm-form-terms'],
    });
    const checkbox = createElement('input', {
      type: 'checkbox',
      id: `eventRegistrationForm-termsAndConditions`,
      name: 'termsAndConditions',
      classList: ['eventRegistrationForm-form-checkbox'],
      required: true,
    });
    const termsLabel = createElement('label', {
      htmlFor: `eventRegistrationForm-termsAndConditions`,
      innerHTML:
        'I accept the <a href='/term-and-conditions' target='_blank'>Terms and Conditions</a>',
      classList: ['eventRegistrationForm-form-terms-label'],
    });
    container.appendChild(checkbox);
    container.appendChild(termsLabel);
    return container;
  }

 "," function updateProgressBar() {
    const progressSteps = document.querySelectorAll(
      '.eventRegistrationForm-form-progress-step'
    );
    // Use for loop for potentially slight performance improvement in simple iteration
    for (let i = 0; i < progressSteps.length; i++) {
      progressSteps[i].classList.toggle(
        'eventRegistrationForm-active',
        i < globals.currentStep
      );
    }
  }

 "," function showStep(stepNumber) {
    // Cache step elements for potential performance improvement if"," function is called frequently
    const stepElements = globals.steps.map((stepId, index) =>
      document.getElementById(`eventRegistrationForm-step-${index}`)
    );

    for (let i = 0; i < stepElements.length; i++) {
      const stepElement = stepElements[i];
      if (stepElement) {
        stepElement.style.display = i + 1 === stepNumber ? 'block' : 'none';
      }
    }

    if (globals.prevButtonRef) {
      globals.prevButtonRef.style.display =
        stepNumber > 1 ? 'inline-block' : 'none';
    }
    if (globals.nextButtonRef) {
      globals.nextButtonRef.style.display =
        stepNumber < globals.steps.length ? 'inline-block' : 'none';
    }
    if (globals.submitButtonRef) {
      globals.submitButtonRef.style.display =
        stepNumber === globals.steps.length ? 'inline-block' : 'none';
    }
  }

 "," function validateCurrentStep() {
    let isValidStep = true;
    let firstInvalidField = null; // To focus on the first error

    switch (globals.currentStep) {
      case 1: // Event Information Step
        if (!validateField(globals.eventIdRef, 'Please select an event.')) {
          isValidStep = false;
          if (!firstInvalidField) firstInvalidField = globals.eventIdRef;
        }
        if (
          !validateField(
            globals.eventDateTimeRef,
            'Please select event date and time.'
          )
        ) {
          isValidStep = false;
          if (!firstInvalidField) firstInvalidField = globals.eventDateTimeRef;
        }
        break;
      case 2: // Ticket Selection Step
        if (
          !validateField(globals.ticketTypeRef, 'Please select a ticket type.')
        ) {
          isValidStep = false;
          if (!firstInvalidField) firstInvalidField = globals.ticketTypeRef;
        }
        const quantity = parseInt(globals.ticketQuantityRef.value, 10); // Radix for parseInt
        if (
          !validateField(
            globals.ticketQuantityRef,
            'Quantity must be at least 1.',
            quantity >= 1
          )
        ) {
          isValidStep = false;
          if (!firstInvalidField) firstInvalidField = globals.ticketQuantityRef;
        }
        break;
      case 3: // Attendee Information Step
        if (
          !validateField(
            globals.attendeeFirstNameRef,
            'First name is required.'
          )
        ) {
          isValidStep = false;
          if (!firstInvalidField)
            firstInvalidField = globals.attendeeFirstNameRef;
        }
        if (
          !validateField(globals.attendeeLastNameRef, 'Last name is required.')
        ) {
          isValidStep = false;
          if (!firstInvalidField)
            firstInvalidField = globals.attendeeLastNameRef;
        }
        const email = globals.attendeeEmailRef.value; // Store email value
        if (
          !validateField(
            globals.attendeeEmailRef,
            'Valid email is required.',
            /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)
          )
        ) {
          isValidStep = false;
          if (!firstInvalidField) firstInvalidField = globals.attendeeEmailRef;
        }
        break;
      case 4: // Payment & Confirmation Step
        if (
          !validateField(
            globals.termsAndConditionsRef,
            'You must accept terms and conditions.',
            globals.termsAndConditionsRef.checked
          )
        ) {
          isValidStep = false;
          if (!firstInvalidField)
            firstInvalidField = globals.termsAndConditionsRef;
        }
        break;
    }

    if (!isValidStep && firstInvalidField) {
      firstInvalidField.focus(); // Focus on the first invalid field for better UX
    }
    return isValidStep;
  }

 "," function validateForm() {
    let isValidForm = true;
    let firstInvalidField = null;

    for (let step = 1; step <= globals.steps.length; step++) {
      globals.currentStep = step;
      if (!validateCurrentStep()) {
        isValidForm = false;
        // Find the first invalid field across all steps
        if (!firstInvalidField) {
          switch (globals.currentStep) {
            case 1:
              if (!validateField(globals.eventIdRef, ""))
                firstInvalidField = globals.eventIdRef;
              else if (!validateField(globals.eventDateTimeRef, ""))
                firstInvalidField = globals.eventDateTimeRef;
              break;
            case 2:
              if (!validateField(globals.ticketTypeRef, ""))
                firstInvalidField = globals.ticketTypeRef;
              else if (!validateField(globals.ticketQuantityRef, "", false))
                firstInvalidField = globals.ticketQuantityRef;
              break;
            case 3:
              if (!validateField(globals.attendeeFirstNameRef, ""))
                firstInvalidField = globals.attendeeFirstNameRef;
              else if (!validateField(globals.attendeeLastNameRef, ""))
                firstInvalidField = globals.attendeeLastNameRef;
              else if (!validateField(globals.attendeeEmailRef, "", false))
                firstInvalidField = globals.attendeeEmailRef;
              break;
            case 4:
              if (!validateField(globals.termsAndConditionsRef, "", false))
                firstInvalidField = globals.termsAndConditionsRef;
              break;
          }
        }
      }
    }
    globals.currentStep = globals.steps.length; // Reset current step

    if (!isValidForm && firstInvalidField) {
      firstInvalidField.focus(); // Focus on the first invalid field if the entire form is invalid
    }

    return isValidForm;
  }

 "," function validateField(field, message, condition = field?.value) {
    // Generalized validation function
    if (!condition) {
      setError(field, message);
      return false;
    } else {
      clearError(field);
      return true;
    }
  }

 "," function setError(field, message) {
    field?.classList.add('eventRegistrationForm-form-error-input'); // Optional chaining
    let errorSpan = field?.parentNode?.querySelector(
      '.eventRegistrationForm-form-error-message'
    ); // Optional chaining
    if (!errorSpan) {
      errorSpan = createElement('span', {
        classList: ['eventRegistrationForm-form-error-message'],
      });
      field?.parentNode?.appendChild(errorSpan); // Optional chaining
    }
    if (errorSpan) {
      errorSpan.textContent = message;
    }
    return false;
  }

 "," function clearError(field) {
    field?.classList.remove('eventRegistrationForm-form-error-input'); // Optional chaining
    const errorSpan = field?.parentNode?.querySelector(
      '.eventRegistrationForm-form-error-message'
    ); // Optional chaining
    if (errorSpan) {
      errorSpan.textContent = "";
    }
  }

 "," function formatFormData(dataFormat) {
    const formData = {};

    for (const key in dataFormat) {
      const ref = globals[`${key}Ref`];
      if (ref) {
        // Check if the ref exists.
        formData[key] = ref.type === 'checkbox' ? ref.checked : ref.value;
      } else if (key === 'addOns') {
        // Special handling for addOns
        formData[key] =
          // Covert to array as a precaution
          Array.from(globals.addOnsRefs)
            ?.filter((r) => r.checked)
            .map((r) => r.value) || []; // Handle potential null
      }
    }

    formData['submissionDate'] = new Date().toLocaleString();
    return formData;
  }

 "," function setStatus(message, type) {
    const statusDiv = document.getElementById('formStatus');
    if (statusDiv) {
      // Check if element exists
      statusDiv.textContent = message;
      statusDiv.className = `formStatus ${type}`; // Template literals for cleaner string concatenation
    }
  }

 "," function toggleButtonState(disabled, text) {
    const button =
      globals.currentStep < globals.steps.length
        ? globals.nextButtonRef
        : globals.submitButtonRef;
    if (button) {
      // Check if the button exists
      button.disabled = disabled;
      button.textContent = disabled ? 'Loading...' : text;
    }
  }

 "," function manageConnection(
    eventType,
    criteriaElement,
    affectedElement,
    condition
  ) {
    if (criteriaElement)
      criteriaElement?.addEventListener(eventType, (e) => {
        if (affectedElement) {
          const result =
            condition instanceof Function
              ? condition(e)
              : new RegExp(condition, 'g').test(
                  e.currentTarget.value.toLowerCase()
                );
          result
            ? // as every field have wrapper so using parentElement safely
              affectedElement.parentElement.classList.remove(
                'eventRegistrationForm-hidden'
              )
            : affectedElement.parentElement.classList.add(
                'eventRegistrationForm-hidden'
              );
        }
      });
  }

 "," function createProgressBar(steps) {
    const progressBar = createElement('div', {
      classList: ['eventRegistrationForm-form-progress'],
    });
    const fragment = document.createDocumentFragment();
    steps.forEach(() =>
      fragment.append(
        createElement('div', {
          className: 'eventRegistrationForm-form-progress-step',
        })
      )
    );
    progressBar.appendChild(fragment);
    return progressBar;
  }

 "," function createFormSteps(steps, formElement) {
    // extract and create fieldsKnowlege from Input JSON (fieldDefinitions)
    const fieldsKnowledge = [
      { id: 'eventId', fieldDefination: 'Event ID' },
      { id: 'eventDateTime', fieldDefination: 'Event Date & Time' },
      { id: 'eventLocation', fieldDefination: 'Event Location' },
      { id: 'promoCode', fieldDefination: 'Promo Code' },
      { id: 'isGroupRegistration', fieldDefination: 'Group Registration' },
      { id: 'groupDiscountCode', fieldDefination: 'Group Discount Code' },
      { id: 'ticketType', fieldDefination: 'Ticket Type' },
      { id: 'ticketQuantity', fieldDefination: 'Ticket Quantity' },
      { id: 'addOns', fieldDefination: 'Add-Ons' },
      { id: 'donationAmount', fieldDefination: 'Donation Amount' },
      { id: 'attendeeFirstName', fieldDefination: 'First Name' },
      { id: 'attendeeLastName', fieldDefination: 'Last Name' },
      { id: 'attendeeEmail', fieldDefination: 'Email' },
      { id: 'attendeeAge', fieldDefination: 'Age' },
      { id: 'attendeePhone', fieldDefination: 'Phone' },
      {
        id: 'attendeeDietaryRestrictions',
        fieldDefination: 'Dietary Restrictions',
      },
      { id: 'emergencyContactName', fieldDefination: 'Emergency Contact Name' },
      {
        id: 'emergencyContactPhone',
        fieldDefination: 'Emergency Contact Phone',
      },
      { id: 'paymentInformation', fieldDefination: 'Payment Information' },
      { id: 'termsAndConditions', fieldDefination: 'Terms and Conditions' },
      { id: 'newsletterSignup', fieldDefination: 'Newsletter Signup' },
      { id: 'referralCode', fieldDefination: 'Referral Code' },
      { id: 'tshirtSize', fieldDefination: 'Select your T-Shirt size' },
      { id: 'companyName', fieldDefination: 'Your company name' },
      { id: 'workshopSelection', fieldDefination: 'Select Workshop' },
    ];

    return steps.map((stepTitle, index) => {
      const stepId = `eventRegistrationForm-step-${index}`; // Generate ID
      const step = createElement('div', {
        id: stepId,
        className: 'eventRegistrationForm-form-step',
        style: index === 0 ? 'block' : 'none',
      });
      const title = createElement('h2', {
        // camel case to capitalize
        textContent: stepTitle
          .replace(/([A-Z])/g, ' $1')
          .trim()
          .replace(/\b\\w/g, (m) => m.toUpperCase()),
        className: 'eventRegistrationForm-form-step-title',
      });
      step.append(title);

      const fieldIds = getFieldIdsForStep(index); // Helper function to get correct ids

      // Use document fragment for performance when appending multiple fields
      const fieldsFragment = document.createDocumentFragment();
      fieldIds.forEach((fieldId) => {
        const fieldDef = {
          id: fieldId,
          fieldDefination: fieldsKnowledge.find((def) => def.id === fieldId)
            ?.fieldDefination, // Optional chaining
        };
        fieldsFragment.appendChild(createField(fieldDef, step)); // Append to fragment
      });
      step.appendChild(fieldsFragment); // Append fragment to step
      return step;
    });
  }

 "," function getFieldIdsForStep(index) {
    switch (index) {
      case 0:
        return [
          'eventId',
          'eventDateTime',
          'eventLocation',
          'promoCode',
          'isGroupRegistration',
          'groupDiscountCode',
        ];
      case 1:
        return ['ticketType', 'ticketQuantity', 'addOns', 'donationAmount'];
      case 2:
        return [
          'attendeeFirstName',
          'attendeeLastName',
          'attendeeEmail',
          'attendeeAge',
          'attendeePhone',
          'attendeeDietaryRestrictions',
          'emergencyContactName',
          'emergencyContactPhone',
          'tshirtSize',
          'companyName',
          'workshopSelection',
        ];
      case 3:
        return [
          'paymentInformation',
          'termsAndConditions',
          'newsletterSignup',
          'referralCode',
        ];
      default:
        return []; // Important: Return an empty array for safety
    }
  }

 "," function createButtonContainer() {
    const buttonContainer = createElement('div', {
      className: 'eventRegistrationForm-form-button-container',
    });

    globals.prevButtonRef = createElement('button', {
      type: 'button',
      textContent: 'Previous',
      className:
        'eventRegistrationForm-form-button eventRegistrationForm-prev-button',
      style: 'display: none',
    });
    globals.prevButtonRef.addEventListener('click', () => {
      if (globals.currentStep > 1) {
        globals.currentStep--;
        updateProgressBar();
        showStep(globals.currentStep);
      }
    });

    globals.nextButtonRef = createElement('button', {
      type: 'button',
      textContent: 'Next',
      className:
        'eventRegistrationForm-form-button eventRegistrationForm-next-button',
    });
    globals.nextButtonRef.addEventListener('click', () => {
      if (validateCurrentStep()) {
        if (globals.currentStep < globals.steps.length) {
          globals.currentStep++;
          updateProgressBar();
          showStep(globals.currentStep);
        }
      }
    });

    globals.submitButtonRef = createElement('button', {
      type: 'submit',
      textContent: 'Submit',
      className:
        'eventRegistrationForm-form-button eventRegistrationForm-submit-button',
      style: 'display: none',
    });

    buttonContainer.append(
      globals.prevButtonRef,
      globals.nextButtonRef,
      globals.submitButtonRef
    );
    return buttonContainer;
  }
"
  ],
  "CSS": {
      "styles":":root {
  --primary-color: #4a90e2;
  --secondary-color: #f5a623;
  --background-color: #f8f9fa;
  --text-color: #333;
  --border-color: #e0e0e0;
  --error-color: #e74c3c;
  --success-color: #2ecc71;
}

.eventRegistrationForm {
  max-width: 800px;
  margin: 40px auto;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.eventRegistrationForm-hidden {
  display: none;
}

.eventRegistrationForm-form-heading {
  text-align: center;
  color: var(--primary-color);
  font-size: 2.5em;
  margin-bottom: 30px;
  font-weight: 700;
}

.eventRegistrationForm-form-progress {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  position: relative;
}

.eventRegistrationForm-form-progress::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background-color: var(--border-color);
  transform: translateY(-50%);
  z-index: 1;
}

.eventRegistrationForm-form-progress-step {
  position: relative;
  z-index: 2;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border: 4px solid var(--border-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--text-color);
  transition: all 0.3s ease;
}

.eventRegistrationForm-form-progress-step.eventRegistrationForm-active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: #fff;
}

.eventRegistrationForm-form-step {
  display: none;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.eventRegistrationForm-form-step-title {
  color: var(--primary-color);
  font-size: 1.8em;
  margin-bottom: 20px;
  font-weight: 600;
}

.eventRegistrationForm-form-label {
  display: block;
  margin-bottom: 8px;
  color: var(--text-color);
  font-weight: 500;
}

.eventRegistrationForm-form-input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 1em;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.eventRegistrationForm-form-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.eventRegistrationForm-form-select-container {
  position: relative;
  width: 100%;
}

.eventRegistrationForm-form-select {
  width: 100%;
  padding: 12px 15px;
  padding-right: 40px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 1em;
  appearance: none;
  background-color: #fff;
  cursor: pointer;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.eventRegistrationForm-form-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.eventRegistrationForm-form-select-arrow {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid var(--text-color);
  pointer-events: none;
}

.eventRegistrationForm-form-select-container:hover
  .eventRegistrationForm-form-select {
  border-color: var(--primary-color);
}

.eventRegistrationForm-form-select-container:hover
  .eventRegistrationForm-form-select-arrow {
  border-top-color: var(--primary-color);
}

.eventRegistrationForm-form-checkbox {
  margin-right: 10px;
}

.eventRegistrationForm-form-terms {
  display: flex;
  align-items: center;
}

.eventRegistrationForm-form-terms-label {
  margin-left: 10px;
  font-size: 0.9em;
}

.eventRegistrationForm-form-button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  gap: 5px;
}

.eventRegistrationForm-form-button {
  flex-grow: 1;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.eventRegistrationForm-form-button.eventRegistrationForm-prev-button {
  background-color: var(--secondary-color);
}

.eventRegistrationForm-form-button.eventRegistrationForm-next-button,
.eventRegistrationForm-form-button.eventRegistrationForm-submit-button {
  background-color: var(--primary-color);
}

.eventRegistrationForm-form-button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.eventRegistrationForm-form-button:disabled {
  background-color: var(--border-color);
  cursor: not-allowed;
  transform: none;
}

.eventRegistrationForm-form-error-input {
  border-color: var(--error-color);
}

.eventRegistrationForm-form-error-message {
  color: var(--error-color);
  font-size: 0.9em;
  margin-top: 5px;
}

.eventRegistrationForm-form-input-group {
  display: flex;
  align-items: stretch;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid var(--border-color);
}

.eventRegistrationForm-form-input-prefix {
  display: flex;
  align-items: center;
  padding: 0 15px;
  background-color: var(--border-color);
  color: var(--text-color);
  font-weight: 600;
}

.eventRegistrationForm-form-input-group > .eventRegistrationForm-form-input {
  border: none;
  border-radius: 0;
}

.eventRegistrationForm-form-addons-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.eventRegistrationForm-form-addon-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.eventRegistrationForm-form-addon-item:hover {
  border-color: var(--primary-color);
}

.eventRegistrationForm-form-addon-label {
  margin-left: 10px;
  font-weight: 500;
}

@media screen and (max-width: 600px) {
  .eventRegistrationForm {
    padding: 20px;
  }

  .eventRegistrationForm-form-progress {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 10px;
  }

  .eventRegistrationForm-form-progress-step {
    flex: 0 0 auto;
    margin-right: 20px;
  }

  .eventRegistrationForm-form-button-container {
    flex-direction: column;
  }

  .eventRegistrationForm-form-button {
    width: 100%;
    margin-bottom: 10px;
  }
}
"
  },
   "expect": "Ensure that you have a form element in your HTML with the class 'eventRegistrationForm'. The generated JavaScript code is designed to be used with an existing form element and will not create a new form element itself. The form should be placed where you want the registration form to appear on your webpage."
}
```
