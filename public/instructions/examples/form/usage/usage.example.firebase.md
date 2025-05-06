#### Firebase firestore and storage

**Input JSON**

```json
{
  "prompt": "A product upload form. Upload the image to Firebase Storage and store it along with other product details in Firebase Firestore's 'products' collection.",
  "filename": "firebaseProductUploadForm",
  "listener": "onSubmit",
  "supportingProps": {
    "database": {
      "name": "firebase firestore and storage",
      "envGuide": "Prefix each variable with NEXT_PUBLIC and suffix with _P2"
    }
  },
  "fieldDefinitions": [
    {
      "id": "name",
      "fieldDefination": "Product Name",
      "validate": "Required"
    },
    {
      "id": "price",
      "fieldDefination": "Product Price",
      "validate": "Required, numeric"
    },
    {
      "id": "category",
      "fieldDefination": "Product Category, A Drop down menu; Food, Cloth, Toys, Furniture, Books",
      "validate": "Required"
    },
    {
      "id": "image",
      "fieldDefination": "Product Image",
      "validate": "Required, image file, must be png or jpg, do not allow other formats."
    }
  ],
  "styleHint": "Form with image upload"
}
```

**Output JSON**

```json
{
  "thoughts": "The prompt requests a product upload form with specific validations and a dropdown for the category. The code will handle image upload to Firebase Storage and product data storage in Firestore, using FormData for input extraction. The category field will be a dropdown with predefined options.",
  "error": {},
  "response": {
    "eventListener": "async function main(event, args) {\n  try {\n    globals.loadingMessage.style.display = 'block';\n    toggleButtonState(true, 'Uploading...');\n    event.preventDefault();\n\n    const formData = new FormData(event.currentTarget);\n    const name = formData.get('name');\n    const price = formData.get('price');\n    const category = formData.get('category');\n    const imageFile = formData.get('image');\n\n    if (!name) throw new Error('Product name is required.');\n    if (!price) throw new Error('Product price is required.');\n    if (!category) throw new Error('Product category is required.');\n    if (!imageFile) throw new Error('Please select an image.');\n    if (!['image/jpeg', 'image/png'].includes(imageFile.type)) {\n      throw new Error('Image must be JPG or PNG.');\n    }\n\n    initializeApp({\n      apiKey: process.env.NEXT_PUBLIC_API_KEY_P2,\n      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_P2,\n      projectId: process.env.NEXT_PUBLIC_PROJECT_ID_P2,\n      storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_P2,\n      messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID_P2,\n      appId: process.env.NEXT_PUBLIC_APP_ID_P2\n    });\n\n    const storageRef = ref(getStorage(), 'images/' + imageFile.name);\n    const snapshot = await uploadBytes(storageRef, imageFile);\n    const downloadURL = await getDownloadURL(snapshot.ref);\n\n    const docRef = await addDoc(collection(getFirestore(), 'products'), {\n      name: name,\n      price: parseFloat(price),\n      category: category,\n      imageUrl: downloadURL\n    });\n\n    globals.errorMessage.style.display = 'none';\n  } catch (error) {\n    globals.errorMessage.textContent = 'Error: ' + error.message;\n    globals.errorMessage.style.display = 'block';\n  } finally {\n    globals.loadingMessage.style.display = 'none';\n    toggleButtonState(false, 'Upload');\n  }\n}",
    "globals": {
      "isFormBuilt": false,
      "submitButtonRef": null,
      "loadingMessage": null,
      "errorMessage": null
    },
    "imports": [
      "import { initializeApp } from 'firebase/app'",
      "import { getFirestore, collection, addDoc } from 'firebase/firestore'",
      "import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'"
    ],
    "helperFunctions": [
      "function createElement(tag, options) {\n  // Extract properties that need special handling\n  const { onClick, type, ...restOptions } = options || {};\n  \n  // For elements where type must be set during creation (like input)\n  const element = type && tag === 'input' \n    ? document.createElement(tag, { type }) \n    : document.createElement(tag);\n  \n  // Handle event listeners\n  if (onClick) {\n    element.onclick = onClick;\n  }\n  \n  // Safely assign remaining properties\n  for (const [key, value] of Object.entries(restOptions)) {\n    try {\n      element[key] = value;\n    } catch (error) {\n      console.warn(Could not set property '${key}' on ${tag} element:, error);\n    }\n  }\n  \n  return element;\n}",
      "function toggleButtonState(disabled, text) {\n  if (globals.submitButtonRef instanceof HTMLButtonElement) {\n    globals.submitButtonRef.disabled = disabled;\n    globals.submitButtonRef.textContent = text;\n  }\n}"
    ],
    "formBuilder": "function formBuilder(formElement, args) {\n  if (globals.isFormBuilt) return;\n\n  if (!(formElement instanceof HTMLFormElement)) {\n    console.warn('Invalid formElement provided. Expected an HTMLFormElement.');\n    return;\n  }\n\n  const heading = createElement('h1', {\n    textContent: 'Product Upload'\n  });\n\n  globals.loadingMessage = createElement('p', {\n    textContent: 'Uploading...', style: 'display: none; color: blue;'\n  });\n\n  globals.errorMessage = createElement('p', {\n    textContent: '', style: 'display: none; color: red;'\n  });\n\n  const nameField = createElement('input', {\n    type: 'text',\n    id: 'firebaseProductUploadForm-name',\n    name: 'name',\n    placeholder: 'Product Name',\n    classList: ['firebaseProductUploadForm-input']\n  });\n\n  const nameLabel = createElement('label', {\n    htmlFor: 'firebaseProductUploadForm-name',\n    textContent: 'Name:',\n    classList: ['firebaseProductUploadForm-label']\n  });\n\n  const priceField = createElement('input', {\n    type: 'number',\n    id: 'firebaseProductUploadForm-price',\n    name: 'price',\n    placeholder: 'Price',\n    classList: ['firebaseProductUploadForm-input']\n  });\n\n  const priceLabel = createElement('label', {\n    htmlFor: 'firebaseProductUploadForm-price',\n    textContent: 'Price:',\n    classList: ['firebaseProductUploadForm-label']\n  });\n\n  const categorySelect = createElement('select', {\n    id: 'firebaseProductUploadForm-category',\n    name: 'category',\n    classList: ['firebaseProductUploadForm-input']\n  });\n\n  const categories = ['Food', 'Cloth', 'Toys', 'Furniture', 'Books'];\n  categories.forEach(category => {\n    const option = createElement('option', {\n      value: category,\n      textContent: category\n    });\n    categorySelect.appendChild(option);\n  });\n\n  const categoryLabel = createElement('label', {\n    htmlFor: 'firebaseProductUploadForm-category',\n    textContent: 'Category:',\n    classList: ['firebaseProductUploadForm-label']\n  });\n\n  const imageField = createElement('input', {\n    type: 'file',\n    id: 'firebaseProductUploadForm-image',\n    name: 'image',\n    accept: 'image/jpeg, image/png',\n    classList: ['firebaseProductUploadForm-input']\n  });\n\n  const imageLabel = createElement('label', {\n    htmlFor: 'firebaseProductUploadForm-image',\n    textContent: 'Image (JPG or PNG):',\n    classList: ['firebaseProductUploadForm-label']\n  });\n\n  globals.submitButtonRef = createElement('button', {\n    type: 'submit',\n    textContent: 'Upload',\n    classList: ['firebaseProductUploadForm-button']\n  });\n\n  formElement.appendChild(heading);\n  formElement.appendChild(globals.loadingMessage);\n  formElement.appendChild(globals.errorMessage);\n  formElement.appendChild(nameLabel);\n  formElement.appendChild(nameField);\n  formElement.appendChild(priceLabel);\n  formElement.appendChild(priceField);\n  formElement.appendChild(categoryLabel);\n  formElement.appendChild(categorySelect);\n  formElement.appendChild(imageLabel);\n  formElement.appendChild(imageField);\n  formElement.appendChild(globals.submitButtonRef);\n\n  globals.isFormBuilt = true;\n}"
  },
  "expect": "The user must have the Firebase package installed. Environment variables for Firebase configuration must be set. The form should have input fields for product name, price, category (dropdown), and an image upload. The form should handle image upload to Firebase Storage, retrieve the download URL, and store the product details along with the URL in Firestore. All fields are required, and the image must be a JPG or PNG file. A form element will be passed to formBuilder function, the formBuilder function must append all the form element to it.",
  "CSS": {
    "styles": ".firebaseProductUploadForm {\n  max-width: 450px;\n  margin: 40px auto;\n  padding: 40px;\n  background: #f9f9f9;\n  border-radius: 12px;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n}\n\n.firebaseProductUploadForm h1 {\n  text-align: center;\n  margin-bottom: 30px;\n  color: #3a3a3a;\n  font-size: 28px;\n  letter-spacing: 0.5px;\n}\n\n.firebaseProductUploadForm-label {\n  display: block;\n  margin-bottom: 10px;\n  color: #4a4a4a;\n  font-weight: 600;\n}\n\n.firebaseProductUploadForm-input,\n.firebaseProductUploadForm select {\n  width: calc(100% - 24px);\n  padding: 12px;\n  margin-bottom: 25px;\n  border: 1px solid #ddd;\n  border-radius: 6px;\n  box-sizing: border-box;\n  font-size: 16px;\n  transition: border-color 0.3s ease;\n}\n\n.firebaseProductUploadForm-input:focus,\n.firebaseProductUploadForm select:focus {\n  border-color: #007bff;\n  outline: none;\n}\n\n.firebaseProductUploadForm-button {\n  width: 100%;\n  background: linear-gradient(to right, #007bff, #66a7ff);\n  color: white;\n  padding: 14px 20px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 18px;\n  font-weight: 600;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.4);\n}\n\n.firebaseProductUploadForm-button:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 6px 15px rgba(0, 123, 255, 0.5);\n}\n\n.firebaseProductUploadForm-button:active {\n  transform: translateY(1px);\n  box-shadow: 0 2px 5px rgba(0, 123, 255, 0.4);\n}\n\n.firebaseProductUploadForm p[style*='color: red'] {\n  color: #d32f2f;\n  margin-top: -15px;\n  margin-bottom: 20px;\n  font-size: 14px;\n}\n\n.firebaseProductUploadForm p[style*='color: blue'] {\n  color: #1976d2;\n  margin-top: -15px;\n  margin-bottom: 20px;\n  font-size: 14px;\n}"
  }
}
```
