### Firebase Authentication

**Input JSON**

```json
{
  "prompt": "User registration form. Use Firebase Authentication to create a new user account. Display success or error messages.",
  "filename": "firebaseSignUpForm",
  "listener": "onSubmit",
  "supportingProps": {
    "database": {
      "name": "firebase authentication",
      "envGuide": "NEXT_PUBLIC before and _P2 at the end of each variable."
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
    },
    {
      "id": "confirmPassword",
      "fieldDefination": "Confirm password",
      "validate": "Required, must match password"
    }
  ]
}
```

**Output JSON**

```json
{
  "thoughts": "This prompt requests a user sign-in form using Firebase Authentication. The form will include email and password fields. The generated code will handle the form submission, initialize Firebase, and use signInWithEmailAndPassword to authenticate the user. It will also manage loading and error states *internally*, by adding loading and error display elements to the form itself",
  "eventListener": "async function main(event, args) { try { globals.loadingMessage.style.display = 'block'; toggleButtonState(true, 'Signing In...'); event.preventDefault(); const email = globals.emailField.value; const password = globals.passwordField.value; initializeApp({ apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID }); const auth = getAuth(); await signInWithEmailAndPassword(auth, email, password); globals.errorMessage.style.display = 'none'; } catch (error) { globals.errorMessage.textContent = 'Error: ' + error.message; globals.errorMessage.style.display = 'block'; } finally { globals.loadingMessage.style.display = 'none'; toggleButtonState(false, 'Sign In'); } }",
  "globals": {
    "isFormBuilt": false,
    "emailField": null,
    "passwordField": null,
    "submitButtonRef": null,
    "loadingMessage": null,
    "errorMessage": null
  },
  "imports": [
    "import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'",
    "import { initializeApp } from 'firebase/app'"
  ],
  "helperFunctions": [
    "function createElement(tag, options) { const element = document.createElement(tag); // Handle dataset separately if (options.dataset) { for (const key in options.dataset) { if (options.dataset.hasOwnProperty(key)) { element.dataset[key] = options.dataset[key]; } } delete options.dataset; // Remove dataset from options to prevent Object.assign error. } Object.assign(element, options); return element; }",
    "function toggleButtonState(disabled, text) { if (globals.submitButtonRef instanceof HTMLButtonElement) { globals.submitButtonRef.disabled = disabled; globals.submitButtonRef.textContent = text; } }"
  ],
  "formBuilder": "function formBuilder(formElement, args) { if (globals.isFormBuilt) return; if (!(formElement instanceof HTMLFormElement)) { console.warn('Invalid formElement provided. Expected an HTMLFormElement.'); return; } const heading = createElement('h1', { textContent: 'User Sign In', classList: ['firebaseSignInForm-title']}); globals.loadingMessage = createElement('p', { textContent: 'Loading...', style: 'display: none; color: blue;' }); globals.errorMessage = createElement('p', { textContent: '', style: 'display: none; color: red;' }); globals.emailField = createElement('input', { type: 'email', id: 'firebaseSignInForm-email', name: 'email', placeholder: 'Enter your email', classList: ['firebaseSignInForm-input'] }); const emailLabel = createElement('label', { htmlFor: 'firebaseSignInForm-email', textContent: 'Email:', classList: ['firebaseSignInForm-label'] }); globals.passwordField = createElement('input', { type: 'password', id: 'firebaseSignInForm-password', name: 'password', placeholder: 'Enter your password', classList: ['firebaseSignInForm-input'] }); const passwordLabel = createElement('label', { htmlFor: 'firebaseSignInForm-password', textContent: 'Password:', classList: ['firebaseSignInForm-label'] }); globals.submitButtonRef = createElement('button', { type: 'submit', textContent: 'Sign In', classList: ['firebaseSignInForm-button'] }); formElement.appendChild(heading); formElement.appendChild(globals.loadingMessage); formElement.appendChild(globals.errorMessage); formElement.appendChild(emailLabel); formElement.appendChild(globals.emailField); formElement.appendChild(passwordLabel); formElement.appendChild(globals.passwordField); formElement.appendChild(globals.submitButtonRef); globals.isFormBuilt = true; }",
  "expect": "The user must have the Firebase package installed. Environment variables for Firebase configuration must be set. The form should have input fields for email and password. The form should handle submission and display success or error messages directly within the form. Make sure that each firebase cred in you .env is prefix with NEXT_PUBLIC and _P2 suffix",
  "CSS": {
    "styles": ".firebaseSignInForm { max-width: 350px; margin: 30px auto; padding: 30px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: sans-serif; } .firebaseSignInForm-title { text-align: center; margin-bottom: 20px; color: #333; font-weight: bold; font-size: larger;} .firebaseSignInForm-label { display: block; margin-bottom: 8px; color: #555; } .firebaseSignInForm-input { width: calc(100% - 22px); padding: 10px; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; } .firebaseSignInForm-button { width: 100%; background-color: #007bff; color: white; padding: 12px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; transition: background-color 0.3s; } .firebaseSignInForm-button:hover { background-color: #0056b3; } .firebaseSignInForm p[style*='color: red'] { color: red; margin-bottom: 10px; } .firebaseSignInForm p[style*='color: blue'] { color: blue; margin-bottom: 10px; }"
  }
}
```
