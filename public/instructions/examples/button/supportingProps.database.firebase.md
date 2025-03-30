### Database Operations Training Data

This section provides training examples for various database operations. Each example demonstrates a specific operation for a specific database type (Firebase or Supabase), handling potential errors, and ensuring the operation's success. The model should generate the code based on the database type specified in the `supportingProps.database.name` field and the prompt. The actual connection details (e.g., API keys) are assumed to be set as environment variables. The model should use the `process.env` object to access the environment variables, following the instructions provided in the `supportingProps.database.envGuide` field. The generated code should include robust error handling for various scenarios, logging appropriate messages to the console to indicate success or failure.

**Accessing Environment Variables:**

The model should access environment variables using the `process.env` object. If the `supportingProps.database.envGuide` field is provided, follow the instructions in this field to access environment variables; otherwise, use `process.env` directly. For example, if `envGuide` is "Use NEXT_PUBLIC before any env variable", to access a variable named `DATABASE_URL`, you should use `process.env.NEXT_PUBLIC_DATABASE_URL`. Omitting the `envGuide` field will result in direct access using `process.env.DATABASE_URL`. Always include appropriate error handling for cases where environment variables are not defined.

#### Connection

This subsection contains examples for establishing a connection to Firebase and Supabase databases. Error handling and console logging are expected. Connection details are accessed via environment variables, following the instructions in `supportingProps.database.envGuide`.

**Database Type: Firebase**

**Description:** Before any Firebase Firestore operation, you must initialize the Firebase app. This example demonstrates initializing the app and then inserting data into a Firestore collection.

**Input JSON:**

```json
{
  "listener": "click",
  "prompt": "a function that inserts _data into the 'test' collection",
  "supportingProps": {
    "database": {
      "name": "firebase firestore",
      "envGuide": "Use NEXT_PUBLIC before each env to access them"
    },
    "variables": {
      "_data": { "active": true }
    }
  }
}
```

**Output JSON**

```json
{
  "thoughts": "The prompt instructs to insert data into a Firestore collection. The Firebase app will be initialized, and the data will be added to the 'test' collection. Error handling is included.",
  "error": {},
  "response": {
    "eventListener": "async function main(event, args) {\n  try {\n    // Initialize Firebase app (assuming config is in environment variables)\n    initializeApp({\n      apiKey: process.env.NEXT_PUBLIC_API_KEY,\n      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,\n      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,\n      storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,\n      messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,\n      appId: process.env.NEXT_PUBLIC_APP_ID\n    });\n\n    const db = getFirestore();\n    const testCollection = collection(db, 'test');\n    const docRef = await addDoc(testCollection, args._data);\n    console.log('Document written with ID: ', docRef.id);\n  } catch (error) {\n    console.error('Error adding document: ', error);\n  }\n}",
    "globals": {},
    "imports": [
      "import { initializeApp } from 'firebase/app'",
      "import { getFirestore, collection, addDoc } from 'firebase/firestore'"
    ]
  },
  "expect": "The user is expected to have the Firebase package installed and to have the required Firebase configuration environment variables set (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId)."
}
```
