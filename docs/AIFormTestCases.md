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
<span style="color:red;font-weight:bold">Failed</span>

**Analysis:** The model is not able to generate multi-steps form even the simplest one.

### Test Case 06

**Prompt**

```tsx
<AIForm
  prompt="Create a restaurant feedback form with the following fields: customer name, visit date, meal type (breakfast, lunch, dinner), food quality rating (1-5), service rating (1-5), ambiance rating (1-5), and additional comments"
  filename="restaurantFeedbackForm"
  listener="onSubmit"
  layout="two-column"
  attributes={{
    className: "feedback-form",
    id: "restaurant-feedback",
    autoComplete: "off",
    noValidate: true,
  }}
  styleHint="Elegant design with food-themed subtle background"
/>
```

**Result:**
<span style="color:green;font-weight:bold">Success</span>

**Analysis:** A bit of struggle but good.

### Test Case 07

**Prompt**

```tsx
<AIForm
  prompt="Create an employee onboarding form with the following fields: full name, employee ID, department (dropdown with options: HR, Engineering, Marketing, Finance, Operations), start date, job title, manager name, office location, emergency contact name, emergency contact phone, and preferred communication channel (email, phone, slack)"
  filename="employeeOnboardingForm"
  listener="onSubmit"
  layout="three-column"
  attributes={{
    className: "onboarding-form corporate-theme",
    id: "new-employee-form",
    autoComplete: "on",
    encType: "multipart/form-data",
  }}
  styleHint="Professional corporate design with subtle grid lines between columns and company logo placeholder at the top"
/>
```

**Result:**
<span style="color:green;font-weight:bold">Success</span>

**Analysis:** The model did well.

### Test Case 08

**Prompt**

```tsx
<AIForm
  prompt="Create a password change form with current password, new password, and confirm new password fields"
  filename="passwordChangeForm"
  listener="onSubmit"
  fieldDefinitions={[
    {
      id: "currentPassword",
      fieldDefination: "Current password field with masked input",
      validate: "Required",
    },
    {
      id: "newPassword",
      fieldDefination:
        "New password field with masked input and password strength indicator",
      validate:
        "Required, must be at least 8 characters with one uppercase letter, one lowercase letter, one number, and one special character, and must not be the same as the current password",
    },
    {
      id: "confirmPassword",
      fieldDefination: "Confirm new password field with masked input",
      validate: "Required, must match exactly with @newPassword",
    },
  ]}
  validate="Show validation errors in real-time as the user types"
  styleHint="Secure appearance with lock icons and visual password strength feedback"
/>
```

**Result:**
<span style="color:green;font-weight:bold">Success</span>

**Analysis:** The model did Great

### Test Case 09

**Prompt**

```tsx
<AIForm
  prompt="Create a product order form with product name, quantity, shipping address, and payment method. Apply specific tax rates based on $REGION and show $SHIPPING_OPTIONS for delivery options."
  filename="productOrderForm"
  listener="onSubmit"
  supportingProps={{
    utils: {
      $REGION: {
        US: 0.07,
        EU: 0.19,
        CA: 0.13,
        UK: 0.2,
      },
      $SHIPPING_OPTIONS: [
        { method: "Standard", days: "5-7 days", cost: 4.99 },
        { method: "Express", days: "2-3 days", cost: 9.99 },
        { method: "Next Day", days: "1 day", cost: 19.99 },
      ],
    },
    variables: {
      productInventory: 15,
      customerDiscount: 0.1,
    },
  }}
  styleHint="E-commerce style with clean layout and order summary section"
/>
```

**Result:**
<span style="color:green;font-weight:bold">Success</span>

**Analysis:** Model did really well.

### Test Case 10

**Prompt**

```tsx
<AIForm
  prompt="Create a comprehensive travel booking form with trip type (one-way, round-trip, multi-city), departure date, return date (conditional on round-trip), destination search with autocomplete suggestion, number of travelers (adults, children, infants), travel class (economy, premium economy, business, first), and special accommodations textarea"
  filename="travelBookingForm"
  listener="onSubmit"
  styleHint="Modern travel website design with gradient accents, flight icons, and responsive layout that adjusts for mobile devices"
  validate="Departure date must be in the future, return date must be after departure date for round-trip bookings, at least one traveler must be selected"
  cacheResponse={false}
/>
```

**Result:**
<span style="color:orange;font-weight:bold">Partially Passed</span>

**Analysis:** The form render is successful and complete but the form submission wasn't consoling the result.

### Test Case 11

**Prompt**

```tsx
<AIForm
  prompt="Create a survey form with name field and age range selection (under 18, 18-25, 26-40, 41-60, over 60). The form should display different questions based on the selected age range. Use the _surveyQuestions variable from supportingProps to get the full list of questions, and filter them based on the age range selected. When the age range changes, call the adjustQuestionsForAge callback with the selected value to update the displayed questions."
  filename="productSurveyForm"
  listener="onSubmit"
  supportingProps={{
    variables: {
      _surveyQuestions: [
        {
          id: 1,
          text: "Do you use social media daily?",
          ageRanges: ["under 18", "18-25", "26-40"],
        },
        {
          id: 2,
          text: "Do you have children in your household?",
          ageRanges: ["26-40", "41-60"],
        },
        {
          id: 3,
          text: "Are you currently employed?",
          ageRanges: ["18-25", "26-40", "41-60"],
        },
        { id: 4, text: "Are you retired?", ageRanges: ["over 60"] },
        {
          id: 5,
          text: "Do you own a smartphone?",
          ageRanges: ["under 18", "18-25", "26-40", "41-60", "over 60"],
        },
        {
          id: 6,
          text: "Do you have a college degree?",
          ageRanges: ["18-25", "26-40", "41-60", "over 60"],
        },
        {
          id: 7,
          text: "Do you play video games?",
          ageRanges: ["under 18", "18-25", "26-40"],
        },
      ],
      _currentQuestions: [],
    },
  }}
  mutation={[
    {
      id: "surveyResults",
      returnFormat: {
        completed: true,
        timestamp: "ISO date string",
        responses: [],
      },
      mutate: "setSurveyData",
      mutationType: "callback",
    },
  ]}
  callbacks={{
    independent: [
      {
        callGuide:
          "Call this function when the form is first loaded to track form impression",
        callback: "trackFormImpression",
      },
    ],
    dependent: [
      {
        callGuide:
          "Call this function when a user changes their age range to filter and update the displayed questions",
        parametersGuide: ["The selected age range value"],
        callback: "adjustQuestionsForAge",
      },
    ],
  }}
  styleHint="Clean survey design with dynamic question sections that update based on age selection"
/>
```

**Result:**
<span style="color:green;font-weight:bold">Success</span>

**Analysis:** The model was instructed to complete the request properly

### Test Case 12

**Prompt**

```tsx
<AIForm
  prompt="Create a newsletter subscription form with email field, interests checkboxes (Technology, Business, Health, Entertainment), and frequency dropdown (Daily, Weekly, Monthly)"
  filename="newsletterSubscriptionForm"
  listener="onSubmit"
  onInit="()=>{}"
  fieldDefinitions={[
    {
      id: "email",
      fieldDefination: "Email input field with placeholder 'your@email.com'",
      validate: "Required, must be a valid email format",
      styleHint: "Prominent with floating label effect",
    },
    {
      id: "interests",
      fieldDefination: "Checkbox group for newsletter topics",
      layout: "grid",
      styleHint: "Modern toggle-style checkboxes with icons for each topic",
    },
    {
      id: "frequency",
      fieldDefination: "Dropdown for selecting newsletter frequency",
      styleHint: "Custom styled select with dropdown animation",
    },
  ]}
  styleHint="Engaging newsletter form with subtle animation effects and visual feedback"
/>
```

**Result:**
<span style="color:green;font-weight:bold">Success</span>

**Analysis:** Complete in first try!

### Test Case 13

**Prompt**

```tsx
<AIForm
  prompt="Create a comprehensive job application form with personal details section, education history section, work experience section, skills assessment, and document uploads. Include form validation and dynamic fields that change based on job type selection."
  filename="complexJobApplicationForm"
  listener="onSubmit"
  cacheResponse={false}
  layout="responsive-sections"
  attributes={{
    className: "job-application-master-form corporate-theme",
    id: "career-application-form",
    encType: "multipart/form-data",
    "data-analytics-id": "job-app-form-v3",
  }}
  styleHint="Professional enterprise design with collapsible sections, progress tracking, and responsive layout that works well on all devices"
  validate="Comprehensive validation with real-time feedback and cross-field validation"
  fieldDefinitions={[
    {
      id: "jobType",
      fieldDefination:
        "Job type selection (Full-time, Part-time, Contract, Internship)",
      validate: "Required",
      styleHint: "Prominent selection buttons with icons",
    },
    {
      id: "personalInfo",
      fieldDefination:
        "Personal information section with fields for full name, email, phone, and address",
      validate: "All fields required, email and phone must be valid formats",
      layout: "two-column",
      styleHint: "Clean layout with subtle field separators",
    },
    {
      id: "education",
      fieldDefination:
        "Education history with degree, institution, field of study, and graduation year",
      validate:
        "At least one education entry required for all job types except internship",
      styleHint: "Repeatable section with add/remove buttons",
    },
    {
      id: "experience",
      fieldDefination:
        "Work experience with job title, company, duration, and responsibilities",
      validate:
        "At least 2 years of experience required for Full-time positions, validate against @jobType",
      styleHint:
        "Repeatable section with rich text editor for responsibilities",
    },
    {
      id: "skills",
      fieldDefination:
        "Skills assessment with 5-point self-rating scale for relevant skills based on job type",
      validate: "At least 3 skills must be rated",
      styleHint: "Interactive skills rating with visual indicators",
    },
    {
      id: "documents",
      fieldDefination:
        "Document upload section for resume, cover letter, and portfolio",
      validate:
        "Resume required for all applications, cover letter required for Full-time and Part-time, portfolio optional",
      styleHint: "Drag-and-drop upload area with file type validation",
    },
  ]}
  supportingProps={{
    utils: {
      $SKILLS_BY_JOB: {
        "Full-time": [
          "Project Management",
          "Team Leadership",
          "Strategic Planning",
          "Budget Management",
        ],
        "Part-time": ["Time Management", "Communication", "Multitasking"],
        Contract: [
          "Self-Management",
          "Technical Expertise",
          "Client Communication",
        ],
        Internship: [
          "Eagerness to Learn",
          "Basic Technical Skills",
          "Communication",
        ],
      },
    },
    variables: {
      _jobDescriptions: {
        "Full-time": "40 hours per week, benefits eligible",
        "Part-time": "20-30 hours per week, limited benefits",
        Contract: "Project-based, flexible hours",
        Internship: "Learning opportunity, 15-20 hours per week",
      },
    },
  }}
  onInit={(formElement) => {
    // Add smooth scrolling between sections
    formElement.querySelectorAll(".section-nav-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const targetSection = document.getElementById(e.target.dataset.target);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    // Initialize tooltips on help icons
    formElement.querySelectorAll(".help-icon").forEach((icon) => {
      // Tooltip initialization code would go here
    });
  }}
  mutation={[
    {
      id: "applicationData",
      returnFormat: {
        status: "submitted",
        timestamp: "ISO date string",
        applicationId: "generated ID",
        completionPercentage: 100,
      },
      mutate: "setApplicationState",
      mutationType: "callback",
    },
  ]}
  callbacks={{
    independent: [
      {
        callGuide:
          "Call this function when the form is first loaded to track form impression",
        callback: "trackFormView",
      },
    ],
    dependent: [
      {
        callGuide:
          "Call this function when job type changes to update required fields and skills",
        parametersGuide: ["Selected job type value"],
        callback: "updateFormForJobType",
      },
      {
        callGuide:
          "Call this function when a section is completed to update the progress tracker",
        parametersGuide: ["Section ID", "Completion status boolean"],
        callback: "updateProgressTracker",
      },
    ],
  }}
>
  <div className="form-header">
    <h1>Career Application Portal</h1>
    <p>Please complete all sections to submit your application</p>
  </div>
</AIForm>
```

**Result:**
<span style="color:red;font-weight:bold">Failed</span>

**Analysis:** After lots of try, the model still can't generate good code.

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
