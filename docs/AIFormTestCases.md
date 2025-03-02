# AIForm Test cases

### Test Case 01

**Prompt**

```tsx
<AIForm
  prompt="Create a simple contact form with name and email fields"
  filename="basicContactForm"
  listener="onSubmit"
  cacheResponse={true}
/>
```

**Result:**
<span style="color:green;font-weight:bold">Success</span>

**Analysis:** Correctly render the form with an event list

### Test Case 02

**Prompt**

```tsx
<AIForm
  prompt="Create a subscription form with email field and a subscribe button"
  filename="subscriptionForm"
  listener="onSubmit"
  styleHint="Modern dark theme with rounded corners and subtle hover effects"
  layout="horizontal"
  cacheResponse={false}
>
  <h2>Join Our Newsletter</h2>
</AIForm>
```

**Result:**
<span style="color:green;font-weight:bold">Success</span>

**Analysis:** Correctly render the form with expected UI

### Test Case 03

**Prompt**

```tsx
<AIForm
  prompt="Create a user registration form with username, email, and password fields"
  filename="registrationFormWithValidation"
  listener="onSubmit"
  validate="Username must be 3-20 characters, email must be valid, password must be at least 8 characters with one uppercase letter, one lowercase letter, and one number"
  formEvents={{
    onSubmit: (data) => console.log("Form submitted:", data),
    onError: (error) => console.error("Validation error:", error),
  }}
/>
```

**Result:**
<span style="color:orange;font-weight:bold">Partially Passed</span>

**Analysis:** The model didn't use the form events because it is **not trained** for it yet.

### Test Case 04

**Prompt**

```tsx
<AIForm
  prompt="Create a job application form"
  filename="jobApplicationForm"
  listener="onSubmit"
  fieldDefinitions={[
    {
      id: "fullName",
      fieldDefination:
        "Full name input field with placeholder 'Enter your full name'",
      validate: "Required",
    },
    {
      id: "email",
      fieldDefination: "Email address with appropriate input type",
      validate: "Must be a valid email address and is required",
    },
    {
      id: "experience",
      fieldDefination:
        "Years of experience as a dropdown with options ranging from 0 to 10+ years",
      validate: "Required",
    },
    {
      id: "coverletter",
      fieldDefination:
        "Large textarea for cover letter with resizable property",
      styleHint: "Minimum height of 150px",
    },
  ]}
  styleHint="Clean professional layout with subtle borders"
/>
```

**Result:**
<span style="color:green;font-weight:bold">Success</span>

**Analysis:** Correctly render the form

### Test Case 05

**Prompt**

```tsx
<AIForm
  prompt="Create a comprehensive checkout process"
  filename="checkoutMultiStepForm"
  listener="onSubmit"
  cacheResponse={false}
  styleHint="Clean e-commerce style with progress indicators"
  multiStep={{
    common:
      "Each step should have a 'Next' button and 'Previous' button except the first and last steps",
    steps: [
      {
        title: "Personal Information",
        fields: ["Full name", "Email address", "Phone number"],
        validate:
          "All fields are required, email must be valid, phone must be a valid format",
        desc: "Collect customer contact details",
      },
      {
        title: "Shipping Address",
        fields: [
          "Street address",
          "City",
          "State/Province",
          "Zip/Postal code",
          "Country",
        ],
        validate: "All fields are required",
        desc: "Collect shipping destination",
      },
      {
        title: "Payment Information",
        fields: [
          "Credit card number",
          "Expiration date",
          "CVV",
          "Billing address",
        ],
        validate:
          "Card number must be valid format, expiration must be future date, CVV must be 3-4 digits",
        styleHint: "Secure payment style with lock icons",
        desc: "Collect payment method securely",
      },
      {
        title: "Order Review",
        fields: ["Order summary", "Terms acceptance checkbox"],
        validate: "Terms must be accepted",
        desc: "Review order before final submission",
      },
    ],
  }}
/>
```

**Result:**
<span style="color:green;font-weight:bold">Success</span>

**Analysis:**

### Test Case --

**Prompt**

```tsx

```

**Result:**
<span style="color:green;font-weight:bold">Success</span>

**Analysis:**

### Test Case --

**Prompt**

```tsx

```

**Result:**
<span style="color:green;font-weight:bold">Success</span>

**Analysis:**

### Test Case --

**Prompt**

```tsx

```

**Result:**
<span style="color:green;font-weight:bold">Success</span>

**Analysis:**

### Test Case --

**Prompt**

```tsx

```

**Result:**
<span style="color:green;font-weight:bold">Success</span>

**Analysis:**

### Test Case --

**Prompt**

```tsx

```

**Result:**
<span style="color:green;font-weight:bold">Success</span>

**Analysis:**

### Test Case --

**Prompt**

```tsx

```

**Result:**
<span style="color:green;font-weight:bold">Success</span>

**Analysis:**

### Test Case --

**Prompt**

```tsx

```

**Result:**
<span style="color:green;font-weight:bold">Success</span>

**Analysis:**

### Test Case --

**Prompt**

```tsx

```

**Result:**
<span style="color:green;font-weight:bold">Success</span>

**Analysis:**

### Test Case --

**Prompt**

```tsx

```

**Result:**
<span style="color:green;font-weight:bold">Success</span>

**Analysis:**

### Test Case --

**Prompt**

```tsx

```

**Result:**
<span style="color:green;font-weight:bold">Success</span>

**Analysis:**
