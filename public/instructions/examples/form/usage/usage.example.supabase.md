#### Supabase Update operation

**Input JSON**

```json
{
  "prompt": "A form to update the salePrice of products in a Supabase 'products' table. Calculate the salePrice by applying the discount to the original price and update the 'salePrice' column in the Supabase table.",
  "filename": "supabaseUpdateSalePriceForm",
  "listener": "onSubmit",
  "supportingProps": {
    "database": {
      "name": "supabase",
      "envGuide": "Use NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables."
    }
  },
  "fieldDefinitions": [
    {
      "id": "discountPercentage",
      "fieldDefination": "Discount Percentage",
      "validate": "Required, numeric, between 0 and 100",
      "styleHint": "% sign on one side of the input"
    }
  ],
  "styleHint": "Beautiful form"
}
```

**Output JSON**

```json
{
  "thoughts": "The prompt requests a form to update the salePrice of products in a Supabase 'products' table, applying a discount percentage. The generated code will include a field for the discount percentage, calculate the new salePrice, and update the table.",
  "error": {},
  "response": {
    "eventListener": "async function main(event, args) {\n  try {\n    globals.loadingMessage.style.display = 'block';\n    toggleButtonState(true, 'Updating...');\n    event.preventDefault();\n\n    const discountPercentage = parseFloat(globals.discountPercentageField.value);\n\n    if (isNaN(discountPercentage) || discountPercentage < 0 || discountPercentage > 100) {\n      throw new Error('Discount percentage must be a number between 0 and 100.');\n    }\n\n    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);\n\n    const { data: products, error: fetchError } = await supabase\n      .from('products')\n      .select('id, price');\n\n    if (fetchError) {\n      throw fetchError;\n    }\n\n    for (const product of products) {\n      const salePrice = product.price * (1 - discountPercentage / 100);\n\n      const { error: updateError } = await supabase\n        .from('products')\n        .update({ salePrice: salePrice })\n        .eq('id', product.id);\n\n      if (updateError) {\n        throw updateError;\n      }\n    }\n\n    globals.errorMessage.style.display = 'none';\n  } catch (error) {\n    globals.errorMessage.textContent = 'Error: ' + error.message;\n    globals.errorMessage.style.display = 'block';\n  } finally {\n    globals.loadingMessage.style.display = 'none';\n    toggleButtonState(false, 'Update');\n  }\n}",
    "globals": {
      "isFormBuilt": false,
      "discountPercentageField": null,
      "submitButtonRef": null,
      "loadingMessage": null,
      "errorMessage": null
    },
    "imports": ["import { createClient } from '@supabase/supabase-js'"],
    "helperFunctions": [
      "function createElement(tag, options) {\n  const element = document.createElement(tag);\n  // Handle dataset separately\n  if (options.dataset) {\n    for (const key in options.dataset) {\n      if (options.dataset.hasOwnProperty(key)) {\n        element.dataset[key] = options.dataset[key];\n      }\n    }\n    delete options.dataset; // Remove dataset from options to prevent Object.assign error.\n  }\n    Object.assign(element, options);\n    return element;\n  }",
      "function toggleButtonState(disabled, text) {\n  if (globals.submitButtonRef instanceof HTMLButtonElement) {\n    globals.submitButtonRef.disabled = disabled;\n    globals.submitButtonRef.textContent = text;\n  }\n}"
    ],
    "formBuilder": "function formBuilder(formElement, args) {\n  if (globals.isFormBuilt) return;\n\n  if (!(formElement instanceof HTMLFormElement)) {\n    console.warn('Invalid formElement provided. Expected an HTMLFormElement.');\n    return;\n  }\n\n  const heading = createElement('h1', {\n    textContent: 'Update Sale Prices'\n  });\n\n  globals.loadingMessage = createElement('p', {\n    textContent: 'Updating...', style: 'display: none; color: blue;'\n  });\n\n  globals.errorMessage = createElement('p', {\n    textContent: '', style: 'display: none; color: red;'\n  });\n\n  const discountPercentageContainer = createElement('div', {\n    classList: ['supabaseUpdateSalePriceForm-input-container']\n  });\n\n  globals.discountPercentageField = createElement('input', {\n    type: 'number',\n    id: 'supabaseUpdateSalePriceForm-discountPercentage',\n    name: 'discountPercentage',\n    placeholder: 'Discount Percentage',\n    classList: ['supabaseUpdateSalePriceForm-input']\n  });\n\n  const percentageLabel = createElement('span', {\n    textContent: '%',\n    classList: ['supabaseUpdateSalePriceForm-percentage-label']\n  });\n\n  discountPercentageContainer.appendChild(globals.discountPercentageField);\n  discountPercentageContainer.appendChild(percentageLabel);\n\n  const discountPercentageLabel = createElement('label', {\n    htmlFor: 'supabaseUpdateSalePriceForm-discountPercentage',\n    textContent: 'Discount Percentage:',\n    classList: ['supabaseUpdateSalePriceForm-label']\n  });\n\n  globals.submitButtonRef = createElement('button', {\n    type: 'submit',\n    textContent: 'Update',\n    classList: ['supabaseUpdateSalePriceForm-button']\n  });\n\n  formElement.appendChild(heading);\n  formElement.appendChild(globals.loadingMessage);\n  formElement.appendChild(globals.errorMessage);\n  formElement.appendChild(discountPercentageLabel);\n  formElement.appendChild(discountPercentageContainer);\n  formElement.appendChild(globals.submitButtonRef);\n\n  globals.isFormBuilt = true;\n}"
  },
  "expect": "The user must have the Supabase package installed. Environment variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set. A 'products' table must exist in Supabase with 'id' and 'price' columns. The form should handle submission and update the 'salePrice' column in the Supabase table.",
  "CSS": {
    "styles": ".supabaseUpdateSalePriceForm {\n  max-width: 450px;\n  margin: 50px auto;\n  padding: 45px;\n  background: linear-gradient(135deg, #e0f7fa, #c2e9f6);\n  border-radius: 15px;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n\n.supabaseUpdateSalePriceForm:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);\n}\n\n.supabaseUpdateSalePriceForm h1 {\n  text-align: center;\n  margin-bottom: 35px;\n  color: #2c3e50;\n  font-size: 32px;\n  font-weight: 700;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  background: linear-gradient(to right, #3498db, #2980b9);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}\n\n.supabaseUpdateSalePriceForm-label {\n  display: block;\n  margin-bottom: 12px;\n  color: #34495e;\n  font-weight: 600;\n  font-size: 18px;\n  transition: color 0.3s ease;\n}\n\n.supabaseUpdateSalePriceForm-label:hover {\n  color: #2980b9;\n}\n\n.supabaseUpdateSalePriceForm-input-container {\n  display: flex;\n  align-items: center;\n  background: #fff;\n  border-radius: 8px;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n  padding: 5px;\n  transition: box-shadow 0.3s ease;\n}\n\n.supabaseUpdateSalePriceForm-input-container:focus-within {\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);\n}\n\n.supabaseUpdateSalePriceForm-input {\n  width: calc(100% - 45px);\n  padding: 15px;\n  margin-bottom: 30px;\n  border: none;\n  border-radius: 8px 0 0 8px;\n  font-size: 16px;\n  color: #333;\n  transition: border-color 0.3s ease;\n  outline: none;\n}\n\n.supabaseUpdateSalePriceForm-percentage-label {\n  margin-left: 10px;\n  font-size: 18px;\n  color: #555;\n  font-weight: 600;\n}\n\n.supabaseUpdateSalePriceForm-button {\n  width: 100%;\n  background: linear-gradient(to right, #2ecc71, #27ae60);\n  color: white;\n  padding: 16px 20px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 18px;\n  font-weight: 600;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n  box-shadow: 0 5px 15px rgba(39, 174, 96, 0.5);\n}\n\n.supabaseUpdateSalePriceForm-button:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 7px 20px rgba(39, 174, 96, 0.6);\n}\n\n.supabaseUpdateSalePriceForm-button:active {\n  transform: translateY(1px);\n  box-shadow: 0 3px 8px rgba(39, 174, 96, 0.5);\n}\n\n.supabaseUpdateSalePriceForm p[style*='color: red'] {\n  color: #e74c3c;\n  margin-top: -20px;\n  margin-bottom: 25px;\n  font-size: 16px;\n  font-weight: 500;\n  animation: fadeIn 0.5s ease;\n}\n\n.supabaseUpdateSalePriceForm p[style*='color: blue'] {\n  color: #3498db;\n  margin-top: -20px;\n  margin-bottom: 25px;\n  font-size: 16px;\n  font-weight: 500;\n  animation: fadeIn 0.5s ease;\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}"
  }
}
```
