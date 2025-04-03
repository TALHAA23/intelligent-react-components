#### Auth operations

##### Registering a user

**Description** Register a user in supabase using email and password.

**Input JSON**

```json
{
  "listener": "click",
  "prompt": "a function that sign-up a user using email-password. The username, email and password can be access through ids username, email and password respectively. Before sign-up make sure the password contain atleast one uppercase letter and is 6 characters long. Alert if the validation fails",
  "supportingProps": {
    "database": {
      "name": "Supbase Auth",
      "envGuide": "use NEXT_PUBLIC at the beginning and _P2 at the end"
    }
  }
}
```

**Output JSON:**

```json
{
  "thoughts": "This prompt describes a function that registers a user with Supabase Authentication using email and password, validating the password before signup. Error handling and efficient code are prioritized.",
  "error": {},
  "response": {
    "eventListener": "const usernameInput = document.getElementById('username');\n    const emailInput = document.getElementById('email');\n    const passwordInput = document.getElementById('password');\n\n    if (!usernameInput || !emailInput || !passwordInput) {\n      console.error('Username, email, or password input elements not found.');\n      return;\n    }\n\n    const username = usernameInput.value.trim();\n    const email = emailInput.value.trim();\n    const password = passwordInput.value.trim();\n\n    if (password.length < 6 || !/[A-Z]/.test(password)) {\n      alert(\n        'Password must be at least 6 characters long and contain at least one uppercase letter.'\n      );\n      return;\n    }\n\n    try {\n      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;\n      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;\n\n      if (!supabaseUrl || !supabaseKey) {\n        throw new Error(\n          'Supabase URL or key not found in environment variables.'\n        );\n      }\n\n      const supabase = createClient(supabaseUrl, supabaseKey);\n\n      const { data, error } = await supabase.auth.signUp({\n        email,\n        password,\n      });\n\n      if (error) throw error;\n      else {\n        console.log('User created successfully:', data);\n      }\n    } catch (error) {\n      console.error('An error occurred:', error);\n    }",
    "globals": {},
    "imports": ["import { createClient } from '@supabase/supabase-js';"]
  },
  "expect": "The user must have the Supabase JavaScript client library installed.  The environment variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set correctly."
}
```

##### Sign-in a user and add access Token to cookies

**Description** The example show how to sign-in a user using email and password, access the access token and add it to cookies.

**Input JSON**:

```json
{
  "listener": "click",
  "prompt": "a function that sign-in a user using email-password. Use email and password as ids to take values. In case of any error or success alert the user. Also if the user is logged in add token to cookies with key supabase-auth-token",
  "supportingProps": {
    "utils": {
      "database": {
        "name": "supabase Auth",
        "envGuide": "use NEXT_PUBLIC before each"
      }
    }
  }
}
```

**Output JSON:**

```json
{
  "thoughts": "This prompt describes a function that signs in a user with Supabase Authentication using email and password, handling success/failure, and storing the token in a cookie upon successful login. Error handling and efficient code are prioritized.",
  "response": {
    "eventListener": "async function main(event, args) {\n  const emailInput = document.getElementById('email');\n  const passwordInput = document.getElementById('password');\n\n  if (!emailInput || !passwordInput) {\n    console.error('Email or password input elements not found.');\n    return;\n  }\n\n  const email = emailInput.value.trim();\n  const password = passwordInput.value.trim();\n\n  try {\n    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;\n    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;\n\n    if (!supabaseUrl || !supabaseKey) {\n      throw new Error(\n        'Supabase URL or key not found in environment variables.'\n      );\n    }\n\n    const supabase = createClient(supabaseUrl, supabaseKey);\n\n    const { data, error } = await supabase.auth.signInWithPassword({\n      email,\n      password,\n    });\n\n    if (error) throw error;\n\n    if (data) {\n      const { user } = data;\n      const accessToken = data.session.access_token;\n      document.cookie = `supabase-auth-token=${accessToken}; path=/`;\n      alert('Login successful!');\n      console.log('User logged in:', user);\n    }\n  } catch (error) {\n    console.error('Error logging in:', error);\n    alert(`Error logging in: ${error.message}`);\n  }\n}",
    "globals": {},
    "imports": ["import { createClient } from '@supabase/supabase-js'"]
  },
  "expect": "The user must have the Supabase JavaScript client library installed. The environment variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set correctly. Elements with IDs 'email' and 'password' must exist in the DOM."
}
```
