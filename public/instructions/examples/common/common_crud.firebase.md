#### Operations (CRUD - Read) - Read, Query, Caching and DOM manipulation

**Description:** The example show a firebase firestore read using query operation, DOM manipulation, cache the data in `globals` to use it later, and response cached if exists. As this is a database operation the Input JSON must define `supportingProps.database.name` and the response should have a connection code like `initializeApp` for firebase.

**Input JSON**

```json
{
  "prompt":"Fetch a dataset from products collection. The dataset contains information about products
 (name, price, category, rating). Filter the data to show only products in the category specified
 by the variable _selectedCategory. Transform the data to calculate the average price of the
 filtered products. Display the average price in a div with id averagePrice. Then, sort the
 filtered products by price (ascending) and display them in a dynamically generated HTML table
 in a div with id productList. Before fetching data, update the loading state to true using the
 mutation '&loading'. Update the loading state to false after fetching and processing and keep showing
 the loading state in an element inside #productList. If there are no products in the selected
 category, display a message 'No products found' in the productList div. If there is any error
 during the operation show it using an element inside #productList",
 "filename":"productsListing",
 "listener": "[EVENT_TYPE]",
 "supportingProps":{
   "database": {
     "name": "firebase",
     "envGuide": "use NEXT_PUBLIC before at and _P2 at then end",
   },
   "variables": {
     "_selectedCategory": "electronics",
   },
 },
 "label":"Listing",
 "mutation":{[
   {
     "id": "loading",
     "returnFormat": "boolean",
   },
 ]}
}
```

**Output JSON**

```json
{
  "thoughts": "This prompt describes a complex data fetching and processing task involving a Firebase database, data transformation, and dynamic HTML generation. The solution includes robust error handling and loading state management. Helper functions are used to improve code organization and readability. The average price is calculated and displayed, and the products are sorted and displayed in a table.",
  "response": {
    "eventListener": "async function main(event, args) {\n  try {\n    args.loading(true);\n    if (!globals.productsData) {\n      initializeApp({\n        apiKey: process.env.NEXT_PUBLIC_API_KEY_P2,\n        authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_P2,\n        projectId: process.env.NEXT_PUBLIC_PROJECT_ID_P2,\n        storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_P2,\n        messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID_P2,\n        appId: process.env.NEXT_PUBLIC_APP_ID_P2,\n      });\n      const db = getFirestore();\n      const productsRef = collection(db, 'products');\n      const q = query(\n        productsRef,\n        where('category', '==', args._selectedCategory)\n      );\n      const querySnapshot = await getDocs(q);\n      const products = querySnapshot.docs.map((doc) => doc.data());\n      globals.productsData = products;\n    }\n    const averagePrice = fnCalculateAveragePrice(globals.productsData);\n    document.getElementById(\n      'averagePrice'\n    ).textContent = `Average Price: $${averagePrice.toFixed(2)}`;\n    const sortedProducts = globals.productsData.sort(\n      (a, b) => a.price - b.price\n    );\n    const table = fnGenerateProductTable(sortedProducts);\n    document.getElementById('productList').innerHTML = table;\n  } catch (error) {\n    document.getElementById(\n      'productList'\n    ).innerHTML = `<p>Error: ${error.message}</p>`;\n    console.error('An error occurred:', error);\n  } finally {\n    args.loading(false);\n  }\n}",
    "globals": {},
    "imports": [
      "import { getFirestore, collection, query, where, getDocs} from 'firebase/firestore'",
      "import { initializeApp } from firebase/app'"
    ],
    "helperFunctions": [
      "function fnCalculateAveragePrice(products) {\n  if (products.length === 0) return 0;\n  const total = products.reduce((sum, product) => sum + product.price, 0);\n  return total / products.length;\n}",
      "function fnGenerateProductTable(products) {\n  if (products.length === 0) return '<p>No products found</p>';\n  let table =\n      '<table><thead><tr><th>Name</th><th>Price</th><th>Category</th><th>Rating</th></tr></thead><tbody>';\n  products.forEach((product) => {\n    table += `<tr><td>${product.name}</td><td>$${product.price}</td><td>${product.category}</td><td>${product.rating}</td></tr>`;\n  });\n  table += '</tbody></table>';\n  return table;\n}"
    ]
  },
  "expect": "The user must have the Firebase package installed. The environment variables NEXT_PUBLIC_API_KEY_P2, NEXT_PUBLIC_AUTH_DOMAIN_P2, NEXT_PUBLIC_PROJECT_ID_P2, NEXT_PUBLIC_STORAGE_BUCKET_P2, NEXT_PUBLIC_MESSAGING_SENDER_ID_P2, NEXT_PUBLIC_APP_ID_P2 must be set. A 'products' collection must exist in Firestore with documents containing 'name', 'price', 'category', and 'rating' fields.  A div with id 'averagePrice' and a div with id 'productList' must exist in the DOM. The variable '_selectedCategory' must be defined and passed in the `args` object."
}
```

#### Real-time database

**Description** The example shows how to add element to firebase realtime database, create a listener and how not to repeat the process using `globals`

**Input JSON:**

```json
{
  "listener": "[EVENT_TYPE]",
  "prompt": "a function that read from .message element and push it to the todos branch. Before that create a real-timer listener for the list (once only) and console the result to user",
  "supportingProps": {
    "database": {
      "name": "firebase real-time",
      "envGuide": "use NEXT_PUBLIC at the beginning and _P2 at the end"
    }
  }
}
```

**Output JSON:**

```json
{
  "thoughts": "This prompt describes a function that reads a message from a DOM element, adds it to a Firebase Realtime Database branch, and sets up a real-time listener to console the updated data. Error handling and efficient code are prioritized. The function uses a CSS selector (`.message`) to target the DOM element.",
  "response": {
    "eventListener": "async function main(event, args) {\n  try {\n    initializeApp({\n      apiKey: process.env.NEXT_PUBLIC_API_KEY_P2,\n      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_P2,\n      projectId: process.env.NEXT_PUBLIC_PROJECT_ID_P2,\n      storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_P2,\n      messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID_P2,\n      appId: process.env.NEXT_PUBLIC_APP_ID_P2,\n    });\n\n    const db = getDatabase();\n    const messageElement = document.querySelector('.message');\n\n    if (!messageElement) {\n      console.error('Element with class 'message' not found.');\n      return;\n    }\n\n    const message = messageElement.value;\n    if (!message) {\n      console.error('Message is empty');\n      return;\n    }\n\n    const newMessageRef = push(\n      child(ref(db, 'todos'), Date.now().toString())\n    );\n    set(newMessageRef, { message });\n    messageElement.value = '';\n\n    if (!globals.todosRealTimeListenerSetted) {\n      // create onValue once only\n      globals.todosRealTimeListenerSetted = true;\n\n      onValue(ref(db, 'todos'), (snapshot) => {\n        const data = snapshot.val();\n        console.log('Realtime data update:', data);\n      });\n    }\n  } catch (error) {\n    console.error('Error:', error);\n  }\n}",
    "globals": { "todosRealTimeListenerSetted": false },
    "imports": [
      "import { initializeApp } from 'firebase/app'",
      "import {getDatabase, ref, push, child, set, onValue} from 'firebase/database'"
    ]
  },
  "expect": "The user must have the Firebase package installed and have the necessary environment variables set (NEXT_PUBLIC_API_KEY_P2, NEXT_PUBLIC_AUTH_DOMAIN_P2, NEXT_PUBLIC_PROJECT_ID_P2, NEXT_PUBLIC_STORAGE_BUCKET_P2, NEXT_PUBLIC_MESSAGING_SENDER_ID_P2, NEXT_PUBLIC_APP_ID_P2). An element with the class 'message' (ideally a text input) must exist in the DOM."
}
```
