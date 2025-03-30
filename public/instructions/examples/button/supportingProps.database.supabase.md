### Database Operations Training Data

This section provides training examples for various database operations. Each example demonstrates a specific operation for a specific database type (Firebase or Supabase), handling potential errors, and ensuring the operation's success. The model should generate the code based on the database type specified in the `supportingProps.database.name` field and the prompt. The actual connection details (e.g., API keys) are assumed to be set as environment variables. The model should use the `process.env` object to access the environment variables, following the instructions provided in the `supportingProps.database.envGuide` field. The generated code should include robust error handling for various scenarios, logging appropriate messages to the console to indicate success or failure.

**Accessing Environment Variables:**

The model should access environment variables using the `process.env` object. If the `supportingProps.database.envGuide` field is provided, follow the instructions in this field to access environment variables; otherwise, use `process.env` directly. For example, if `envGuide` is "Use NEXT_PUBLIC before any env variable", to access a variable named `DATABASE_URL`, you should use `process.env.NEXT_PUBLIC_DATABASE_URL`. Omitting the `envGuide` field will result in direct access using `process.env.DATABASE_URL`. Always include appropriate error handling for cases where environment variables are not defined.

#### Connection

This subsection contains examples for establishing a connection to Firebase and Supabase databases. Error handling and console logging are expected. Connection details are accessed via environment variables, following the instructions in `supportingProps.database.envGuide`.

#### Database Type: Supabase

**Description:** This example demonstrates establishing a connection to Supabase and inserting data into a table.

**Input JSON:**

```json
{
  "listener": "click",
  "prompt": "Connect to Supabase and insert { name: 'Test User', age: 30, email: 'test@example.com' } into the users table",
  "supportingProps": {
    "database": {
      "name": "Supabase",
      "envGuide": "Use NEXT_PUBLIC"
    }
  }
}
```

**Output JSON:**

```json
{
  "thoughts": "This prompt instructs to connect to Supabase and insert data.  Error handling is included.",
  "error": {},
  "response": {
    "eventListener": "async function main(event, args) {\n  try {\n    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;\n    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;\n    const supabase = createClient(supabaseUrl, supabaseKey as string);\n    const res = await supabase.from('users').insert({ name: 'Test User', age: 30, email: 'test@example.com' });\n    console.log(res);\n  } catch (err) {\n    console.log(err);\n  }\n}",
    "globals": {},
    "imports": ["import { createClient } from '@supabase/supabase-js'"]
  },
  "expect": "The user must have the Supabase JavaScript client library installed. The environment variables SUPABASE_URL and SUPABASE_ANON_KEY must be set correctly. A table named 'users' must exist in the Supabase database."
}
```
