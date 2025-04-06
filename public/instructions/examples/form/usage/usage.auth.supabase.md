### Supbase Authentication

**Input JSON**

```json
{
  "prompt": "Create a user sign-in form with fields for email and password. Use Supabase Authentication to sign in an existing user. Display success or error messages within the form.",
  "filename": "supabaseSignInForm",
  "listener": "onSubmit",
  "supportingProps": {
    "database": {
      "name": "supabase authentication",
      "envGuide": "Use NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables."
    }
  },
  "fieldDefinitions": [
    {
      "id": "email",
      "fieldDefination": "Email address",
      "validate": "Required, valid email address"
    },
    {
      "id": "password",
      "fieldDefination": "Password",
      "validate": "Required, minimum 6 characters"
    }
  ],
  "layout": "one-column",
  "styleHint": "Modern, clean design"
}
```

**Output JSON**

```json
{
  "thoughts": "This prompt requests a user sign-in form using Supabase Authentication. The form will include email and password fields. The generated code will handle the form submission, initialize Supabase, and use signInWithPassword to authenticate the user. It will also manage loading and error states *internally*, by adding loading and error display elements to the form itself",
  "error": {},
  "response": {
    "eventListener": "async function main(event, args) {\n  try {\n    globals.loadingMessage.style.display = 'block';\n    toggleButtonState(true, 'Signing In...');\n    event.preventDefault();\n\n    const email = globals.emailField.value;\n    const password = globals.passwordField.value;\n\n    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);\n\n    const { error } = await supabase.auth.signInWithPassword({\n      email: email,\n      password: password\n    });\n\n    if (error) {\n      throw error;\n    }\n\n    globals.errorMessage.style.display = 'none';\n  } catch (error) {\n    globals.errorMessage.textContent = 'Error: ' + error.message;\n    globals.errorMessage.style.display = 'block';\n  } finally {\n    globals.loadingMessage.style.display = 'none';\n    toggleButtonState(false, 'Sign In');\n  }\n}",
    "globals": {
      "isFormBuilt": false,
      "emailField": null,
      "passwordField": null,
      "submitButtonRef": null,
      "loadingMessage": null,
      "errorMessage": null
    },
    "imports": ["import { createClient } from '@supabase/supabase-js'"],
    "helperFunctions": [
      "function createElement(tag, options) {\n  const element = document.createElement(tag);\n  // Handle dataset separately\n  if (options.dataset) {\n    for (const key in options.dataset) {\n      if (options.dataset.hasOwnProperty(key)) {\n        element.dataset[key] = options.dataset[key];\n      }\n    }\n    delete options.dataset; // Remove dataset from options to prevent Object.assign error.\n  }\n    Object.assign(element, options);\n    return element;\n  }",
      "function toggleButtonState(disabled, text) {\n  if (globals.submitButtonRef instanceof HTMLButtonElement) {\n    globals.submitButtonRef.disabled = disabled;\n    globals.submitButtonRef.textContent = text;\n  }\n}"
    ],
    "formBuilder": "function formBuilder(formElement, args) {\n  if (globals.isFormBuilt) return;\n\n  if (!(formElement instanceof HTMLFormElement)) {\n    console.warn('Invalid formElement provided. Expected an HTMLFormElement.');\n    return;\n  }\n\n  const heading = createElement('h1', {\n    textContent: 'User Sign In'\n  });\n\n  globals.loadingMessage = createElement('p', {\n    textContent: 'Loading...', style: 'display: none; color: blue;'\n  });\n\n  globals.errorMessage = createElement('p', {\n    textContent: '', style: 'display: none; color: red;'\n  });\n\n  globals.emailField = createElement('input', {\n    type: 'email',\n    id: 'supabaseSignInForm-email',\n    name: 'email',\n    placeholder: 'Enter your email',\n    classList: ['supabaseSignInForm-input']\n  });\n\n  const emailLabel = createElement('label', {\n    htmlFor: 'supabaseSignInForm-email',\n    textContent: 'Email:',\n    classList: ['supabaseSignInForm-label']\n  });\n\n  globals.passwordField = createElement('input', {\n    type: 'password',\n    id: 'supabaseSignInForm-password',\n    name: 'password',\n    placeholder: 'Enter your password',\n    classList: ['supabaseSignInForm-input']\n  });\n\n  const passwordLabel = createElement('label', {\n    htmlFor: 'supabaseSignInForm-password',\n    textContent: 'Password:',\n    classList: ['supabaseSignInForm-label']\n  });\n\n  globals.submitButtonRef = createElement('button', {\n    type: 'submit',\n    textContent: 'Sign In',\n    classList: ['supabaseSignInForm-button']\n  });\n\n  formElement.appendChild(heading);\n  formElement.appendChild(globals.loadingMessage);\n  formElement.appendChild(globals.errorMessage);\n  formElement.appendChild(emailLabel);\n  formElement.appendChild(globals.emailField);\n  formElement.appendChild(passwordLabel);\n  formElement.appendChild(globals.passwordField);\n  formElement.appendChild(globals.submitButtonRef);\n\n  globals.isFormBuilt = true;\n}"
  },
  "expect": "The user must have the Supabase package installed. Environment variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set. The form should have input fields for email and password. The form should handle submission and display success or error messages directly within the form. A form element will be passed to formBuilder function, the formBuilder function must append all the form element to it.",
  "CSS": {
    "styles": ".supabaseSignInForm {\n  max-width: 350px;\n  margin: 30px auto;\n  padding: 30px;\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n  font-family: sans-serif;\n}\n\n.supabaseSignInForm h1 {\n  text-align: center;\n  margin-bottom: 20px;\n  color: #333;\n}\n\n.supabaseSignInForm-label {\n  display: block;\n  margin-bottom: 8px;\n  color: #555;\n}\n\n.supabaseSignInForm-input {\n  width: calc(100% - 22px);\n  padding: 10px;\n  margin-bottom: 20px;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  box-sizing: border-box;\n}\n\n.supabaseSignInForm-button {\n  width: 100%;\n  background-color: #007bff;\n  color: white;\n  padding: 12px 20px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 16px;\n  transition: background-color 0.3s;\n}\n\n.supabaseSignInForm-button:hover {\n  background-color: #0056b3;\n}\n\n.supabaseSignInForm p[style*='color: red'] {\n  color: red;\n  margin-bottom: 10px;\n}\n\n.supabaseSignInForm p[style*='color: blue'] {\n  color: blue;\n  margin-bottom: 10px;\n}"
  }
}
```
