Status: Incomplete

# Prompt Engineering

[//]: # "Title: Prompt Engineering"
[//]: # "Author: Talha Sifat"
[//]: # "Type: Research, Documentation"
[//]: # "Date: 2024-09-22"
[//]: # "From Sprint Number: 2"
[//]: # "Task title: Prompt Engineering and Research"

## Introduction

### Purpose of Research

The primary objective of this research is to evaluate the capabilities of Google AI in generating code from textual prompts. By experimenting with various prompts and analyzing the generated outputs, we aim to understand the model's strengths, limitations, and potential for practical application in code generation tasks.

Specifically, this research will explore the following:

1. **Prompt Engineering**: Investigating effective techniques for crafting prompts that elicit accurate and relevant code generation.
2. **Model Behavior**: Analyzing the model's responses to different prompts, including its ability to generate functional code, avoid hallucinations, and handle complex scenarios.
3. **Data Format:** Assessing the model's ability to generate accurate JSON and function definitions.

4. **Iterative Improvement:** Implementing an iterative process of prompt engineering and evaluation to refine the model's performance.
   Through this research, we seek to gain insights into the potential of Google AI as a tool for code generation and identify areas for future development and improvement.

Let's dive in and explore the findings and best practices. The document will include everything from start to end, starting from simple prompts all the way to our final prompt formats.

## Google AI setup

Using [Google AI Studio][Google AI Studio] we will do the prompt engineering after which we can easily export our promts and start with it in our code.

So we will start a [new chat][google ai new prompt]. on the page we have **system intruction** where we define a blue print and tone for the response.

## Prompt Experiments

Let's begin with actual expirements. so from a vedio, [The Top 4 Methods for Prompt Engineering][Methods for Prompt Engineering video] on [Youtube][Youtube] by [Tiff In Tech][tiffInTech yt channel] we have 4 types of prompt engineering. we will expirment with those and find what suite best in our case. The four types are

1. **Zero-shot learning:** Zero-shot prompting is like being asked to solve a problem or perform a task without any specific preparation or examples just for that task.
2. **Few-shot learning:** A technique in which an AI model is given a few examples of a task to learn from
3. **Prompt chaining:** Breaking down a complex task into a series of smaller, interconnected prompts, where the output of one prompt serves as the input for the next
4. **DSP (Directional Stimulus Prompting):** Using DSP you are helping guide AI to very specific topics or very specific areas so one application would be say creative writing say you would like to work with an AI to help you write a story this creative writing piece what you can do is guide it in suggesting the tone The Voice the the length of the piece of writing really guiding as to what this response will look like.

Before we use each of them and find the best suite for us let think about a sceanrio or example to use it for out findings.

We will be using two prompts **System intruction** and the **user prompt** we have to make the system instrucion as good as possible so it can response to the user prompt accoding to expectation. Know let talk about what sceanrio to use.

We will start with simple sceario which need simple coding, find the best amoung the four prompt, and filter out anyone that is not working. we than will take the selected one and pass more creative and complex scaerio to it unitl we find our best prompting which will become our **Prompt engineering**.

Its worth noticing that we will have various **AI Components** so we also will have more than one **system intruction**. for this research we will only cover **Intellegint Button** and will use the research as beanchmark for other **Intellegint components**.

let's know start with an example, use the 4 natures of prompt and continur with the expirments

### Level 01 - Basic

For level one lets use a basic sceario:

```
Write JavaScript code to display an alert when a button is clicked.
```

#### **Zero Shot learning**

_system intruction - zsl-l1-01_

```
You are a javascript developer. for any prompt you get you generate javascript code.
```

_response_

```html
<!doctype html>
<html>
  <head>
    <title>Button Click Alert</title>
  </head>
  <body>
    <button onclick="showAlert()">Click Me</button>

    <script>
      function showAlert() {
        alert("You clicked the button!");
      }
    </script>
  </body>
</html>
```

Totally not what we need. it create a whole **HTML** page while what we want is just a function. so let change our **system intruction** little bit.
_system intruction - zsl-l1-02_

```
You are a JavaScript developer. for any prompt you get you generate a javascript function performing the task. only javascript function that can be used with .js extension
```

_response_

```javascript
function displayAlert() {
  alert("Button clicked!");
}
```

Great response. that exactly what we need. seems like we have to stop right here😁.
As you have seen even the **Zero shot learning** prompt is accoding to our expectation for a **Basic example**. we don't need to test it with the other prompts because ofcouse they will do better instead we will contrinue to **Level 2** and see how the **Zero shot learning** do its job there.

### Level 02 - Intermediate

For level two lets use an intermediate sceanario:

```
Create a JavaScript function that changes the text of a button to 'Submitted' when it is clicked.
```

#### **Zero Shot learning**

We will keep the system insturction from level 1.

_system intruction - zsl-l2-01_

```
You are a JavaScript developer. for any prompt you get you generate a javascript function performing the task. only javascript function that can be used with .js extension
```

_response_

```javascript
function changeButtonText() {
  const button = document.getElementById("myButton"); // Assuming the button has an id "myButton"
  button.textContent = "Submitted";
}
```

Alright as you can see the function is very hardcoded to change only the text content of `#myButton` only. it even has add that comment but that's not useful. so once again let's change our **system instruction**

_system instruction - zsl-l2-02_

```
You are a JavaScript developer. for any prompt you get you generate a javascript function performing the task. only javascript function that can be used with .js extension. any function you generate should not use any hardcoded values. if possible use event object.
```

we have added the `if possible use event object` as we always work with event so the line can be useful for any other prompt.

With this once again **Zero shot learning** has completed the task so we should move to **Level 3** to see how we go.

### Level 03 - Advanced

For level three lets use some Advanced sceanario:

```
Generate JavaScript code that fetches data from API_ENDPOINT-01 and updates the content of a div element when a button is clicked.

API_ENDPOINT-01: https://jsonplaceholder.typicode.com/users
```

#### **Zero Shot learning**

Alright our **System intruction** remain the same form **Level 02**
_system instruction - zsl-l2-02_

```
You are a JavaScript developer. for any prompt you get you generate a javascript function performing the task. only javascript function that can be used with .js extension. any function you generate should not use any hardcoded values. if possible use event object.
```

_response_

```javascript
function updateDivContent(event) {
  const apiEndpoint = "https://jsonplaceholder.typicode.com/users";
  const divElement = document.getElementById("user-data"); // Replace 'user-data' with the actual ID of your div element

  fetch(apiEndpoint)
    .then((response) => response.json())
    .then((data) => {
      divElement.innerHTML = ""; // Clear the div before adding new content
      data.forEach((user) => {
        const userDiv = document.createElement("div");
        userDiv.innerHTML = `
          <h3>${user.name}</h3>
          <p>Username: ${user.username}</p>
          <p>Email: ${user.email}</p>
        `;
        divElement.appendChild(userDiv);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      divElement.innerHTML = "Error loading user data";
    });
}
```

Great work, if you inspect the code it use the correct **API-ENDPOINT**, refer to a hardcoded `div` but that's ok as we have not mention anything. it even understand the context which is to use the response as content for the `div` which is great. not only that as the **API** has used **/users** it know that it will return array so it create div for each. while that was great but the response also added this information.

```
Explanation:
1. updateDivContent(event): This function takes the click event as an argument.
...
12. catch(error => { ... }): Handles any errors during fetching or processing data.

Usage:

Make sure you ... button is clicked.
```

This is not good because we need function only as we will directy add the response to an event listner so the plain text will cause problem. let's again change our **System intruction** to excude any plain text from inclusion.

_system instruction - zsl-l3-01_

```
You are a JavaScript developer. for any prompt you get you generate a javascript function performing the task. only javascript function that can be used with .js extension. any function you generate should not use any hardcoded values. if possible use event object. do not include any plain text in the response like explanation and usage. the response will always be a function with no other details.
```

_test the same prompt with new instruction pause..._

Alright after doing so we know only have code. Once again **Zero shot learning** had done the job so we will move to **Level 04**

### Level 04 - Complex

For level Four lets use some Complex sceanario:

```
Write JavaScript code that opens a modal dialog with a form when a button is clicked, and submits the form data to a server when the 'Submit' button is clicked.
```

#### **Zero Shot learning**

We will use **System intruction** from **Level 03**
_system instruction - zsl-l3-01_

```
You are a JavaScript developer. for any prompt you get you generate a javascript function performing the task. only javascript function that can be used with .js extension. any function you generate should not use any hardcoded values. if possible use event object. do not include any plain text in the response like explanation and usage. the response will always be a function with no other details.
```

_response_

```javascript
function openModalAndSubmitForm(event) {
  const modal = document.getElementById("my-modal");
  modal.style.display = "block";
  const form = modal.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    fetch("/submit-form", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        modal.style.display = "none";
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  });
}
```

This one look problematic. if you inspect the code you will see that to open a model it uses `modal.style.display = 'block';` just `css` but in `javascript` we can open a model using `modal.open()` method. but it has not use it. now we canno't impove the **system instruction** anymore for **Zero shot learning** as now the problem are getting more specific so it will need **Examples** to go. so let's move for the first time to use **Few Shot Learning**.

---

#### Few Shot Learning

We will keep the **System instruction** same and change the **User prompt** to know provide example on how they want to do something. For our previous prompt we will know change it to something like this:

_system instruction - fsl-l4-01_

```
Write JavaScript code that opens a modal dialog with a form when a button is clicked, and submits the form data to a server when the 'Submit' button is clicked.

#instruction
$modal dialog: use the modal.showModal() method to display a modal dialog
```

_response_

```javascript
function openModalAndSubmitForm(event) {
  const modal = document.getElementById("my-modal");
  modal.showModal();
  const form = modal.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    fetch("/submit-form", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        modal.close();
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  });
}
```

As you can see the dialog box will now be opened as `modal`. as **Few shot learning** had done the job we will discard the **~~Zero shot model~~** from now on. let move to **Level 05**

### Level 05 - Very Complex

For level Four lets use some Very Complex sceanario:

```
Write a JavaScript function that, when a button is clicked, updates the component's $LOADING_STATE to indicate loading, makes a GET request to $API_ENDPOINT_1, updates the component's $DATA_STATE state with the retrieved data, renders a list of items based on the retrieved data, and saves the data to a local database using IndexedDB. If an error occurs during any of these steps, the function should display an error message to the user.

$references
$API_ENDPOINT_1:https://jsonplaceholder.typicode.com/users
$LOADING_STATE:setState()
$DATA_STATE:setData()
```

Alright so the AI is not able to replace `$SOME_WORD` with it reference word. we need to change our instruction so it understand that a word started with `$` need to be changes with corosponding value in `#refernces`,

#### Few shot learning

Instruction remain's the same:

_system instruction - fsl-l5-01_

```
You are a JavaScript developer. for any prompt you get you generate a javascript function performing the task. only javascript function that can be used with .js extension. any function you generate should not use any hardcoded values. if possible use event object. do not include any plain text in the response like explanation and usage. the response will always be a function with no other details.


When you get a prompt they might have word with a prefix of $ like $THIS_WORD, $THAT_WORD. when you see such word you have to replace it with its corresponding value. you will find there actual somewhere in the prompt. like $THIS_WORD = updateState(). then when you generate code base on the prompt you have to call or use updateState and not $THIS_WORD
```

_response_

```javascript
function handleClick(event) {
  setState({ loading: true });
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      setData({ data: data });
      const listContainer = document.getElementById("itemList");
      listContainer.innerHTML = "";
      data.forEach((item) => {
        const listItem = document.createElement("div");
        listItem.textContent = `${item.name} - ${item.email}`;
        listContainer.appendChild(listItem);
      });
      saveDataToIndexedDB(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      // Display error message to the user
      // ...
    })
    .finally(() => {
      setState({ loading: false });
    });
}

async function saveDataToIndexedDB(data) {
  try {
    const db = await openIndexedDB("yourDatabaseName");
    const transaction = db.transaction("users", "readwrite");
    const objectStore = transaction.objectStore("users");
    data.forEach((item) => {
      objectStore.add(item);
    });
    await transaction.complete;
  } catch (error) {
    console.error("Error saving data to IndexedDB:", error);
    // ... (handle IndexedDB error)
  }
}

async function openIndexedDB(dbName) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "id" });
      }
    };
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}
```

Finally 🎉 we have handle a **Very complex** sceanrio. and we reach upto **Few shot learning**.

Now we are done with **Prompt engineering** here but we are not stopping here at all. we only will use this section and its outcomes as a **Beanch mark** and will keep moving to do lots of testing with various different examples. while **Few shot learning** done the job we still might move to use **DSP (Directional Stimulus Prompting)**. As we know have a working prompt system next we will move to **Data formats** and **Iterative Improvement** to further impove our prompt system.

## Data Format:

We can prompt AI to do our job but the response will be in various type and will be different for every new request. That's not ok because the response is not inspected by a human rather it is just use directly assuiming that its always correct. So our response handler will alway's be static so we should prompt our AI is such a way that we always get response in expected format so we can just pre-process it.

We have planned to get response in the following format:

```json
{
  "event": "function() { ... }"
  "error": {"message":"string"}
}
```

if we create a proper data structure then it should looks like this

| field                    | type     | converstion type | description                                                                           |
| ------------------------ | -------- | ---------------- | ------------------------------------------------------------------------------------- |
| `response`               | `json`   | `object`         | response will be an object of type json as only string can travel through the network |
| `response.event`         | `string` | `function`       | event will have the actual code                                                       |
| `response.error`         | `json`   | `object`         | error object containing message                                                       |
| `response.error.message` | `string` | `string`         | message contain the reason on why the response is not completed                       |

now to get response in this type we have to change our **system instruction**. In a previous section where we were doing **prompt expirementing** there we mention that we will move to use **DSP (Directional Stimulus Prompting)**

## Research on using DSP (Directional Stimulus Prompting)

Before we use it to engineer our prompt I have found a similer example for [Google AI Studio Prompt gallary][prompt_gallary] the specific example is about [Barista Bot][prompt_gallary_example_01]. They have really nice prompt enginnerring and if you read it you will find out it is using **DSP**. so we will use that example to prompt enginner for our **Intellegint components**

---

## Fine tunning

### Description

You are a Javascript HTML Button element's Event generator and you are restricted to craft precise, efficient, and well-documented Event listener functions based on user-provided prompts. Do not talk about anything but generative function definition based on user prompt, ever.
Your goal is to finish function generation after understanding the prompt and any instruction the user wants.
If you are unsure about a prompt, ask a question to clarify or redirect using an error move.
You will always get a requirement object with various information that will help you to understand the requirement.

For every turn, always check the object sent to you and perform one or more of the Moves listed below.

### Error response:

The functions you generate based on a prompt are directly executed in the js environment. so if you do not understand the prompt or it's incomplete, vague, or not a javascript/react code then do not hallucinate and respond with an error with a message containing the problem. The error response format will be discussed is response format but this is to tell that you have to properly check the user prompt for completes, do not assume things if anything is missing respond with Error only.

### Moves:

- prompt: first understand the prompt field as this is where the main action to perform is described.
  listener: check the listener to understand where the generated function will be placed by the user to understand its nature.
- supportingProps:
  - supportingProps.utils:
    check this to complete the main prompt. the main prompt will have words whose actual value will be listed here, you will have to use the one listed here.
  - supportingProps.parameters: check the parameter, if any you have to generate a function that defines the exact arguments in the same sequence.
    mutation: check this object which tells you what the generated function will change in another part of the user code.
- mutation
  - mutation.returnFormat: this tells you the format in which the data will be assigned to a variable or a state setter.
  - mutation.mutate: this is the main part that will be mutated. You have to call these and update them with mutations.returnFormat
  - mutation.mutationType: this tells the nature of mutation is it a function call or a variable assignment? default will be `callback` if no value is provided.

### Response Format

Respond in the following JSON format:

```json
"thoughts":"Start with explaining how you have understood the user prompt",
"move1": "a string with one or more of the following values:
checkPrompt|checkSupportingProps|checkListner|checkMutation|checkCallbacks|checkerror",
"move2": "a string with one or more of the following values:
checkPrompt|checkSupportingProps|checkListner|checkMutation|checkCallbacks|checkerror",
"move3": "a string with one or more of the following values:
checkPrompt|checkSupportingProps|checkListner|checkMutation|checkCallbacks|checkerror",
"move4": "a string with one or more of the following values:
checkPrompt|checkSupportingProps|checkListner|checkMutation|checkCallbacks|checkerror",
"error":{
"message": "appropriate error message",
"status": "appropriate error status",
"statusText": "appropriate error text"
}
"response":{
"event": "the generated function",
"globals": "globals is a codespace for me where I place things that are useful for me in the generated function. says if I need a static variable I can declare it here and use it. globals are options and their type is object I only include it if I need it. if I generate more than one function I will add them in global and use one main function and call all of them.",
"globals": "use this field as a variables playground. suppose you need variables or functions that need to be declared outside of the generative function so they remain static then you can use globals to do that. globals will be object which will hold properties and methods that the generated function uses but it is not a part of the function itself. omit if no additional properties or methods are not required",
"expect": "This is where you define the expectation from the user so the generated code works as expected. so like if the function takes an args argument and it expects to have n1, n2, n3, etc keys you will define them for the user that the I expect that this function is provided with this much data"
}
```

### Thought process:

- checkPrompt: I will start by checking the prompt to understand the action the user wants to perform. Scan it if it has any words starting with `$` which refers to the `supportingProps.utils` field or `&` which refers to `mutation` field.
- check supportingProps:

  - check `supportingProps.utils`: The prompt has some words beginning with a prefix of `$` for example `$API` so I will check `supportingProps.utils` to use the corresponding value. The `supportingProps.utils` is an object with keys and values so I will locate the `$API` key and get its value to use in the generated function.
  - check `supportingProps.variables`: The prompt has some words beginning with a prefix of `_` for example `_var` so I will check `supportingProps.variables` to use the corresponding value. The `supportingProps.variables` is an object with keys and values so I will locate the `var` key and get its value to use in the generated function. the purpose is that if a prompt depends on outer variables there values are given here.

- checkMutation: I will then check the `mutation` field which is an object array to understand if there is anything the generated function will change. I will check each index of the mutation objects array and check:
  - `mutation.id`: if the user mentions a word with the prefix `&` for example `&001` in the main prompt I will find the index in `mutation` whose `mutation.id` matches `001` and use only that object to understand what changes are required.
  - returnFormat: how the update values will look like.
  - mutate: the user part of the code that I will use for mutation. As this is the user part of the code that my generated function is using to assure its presence I will ensure to declare one argument for the generated function named `args` and then only use `args` to call the mutation. so suppose the value here is `setState` and its Id is `STATE_SETTER` I must call it `args.STATE_SETTER` so it accesses the user's codebase.
- checkCallbacks: I will check the `callbacks` field to see if there is any callback function that the user would like to call inside the function that I will generate. As the callbacks are part of the user codebase that is called from the generated function I will ensure that the generated function defines one argument named `args` and I will only use `args` to call the callback. for every callback I get `useGuide` and `callback` field so what I do is to assume the value assigned to `callback` as the function name that i will call so if `callback = someFunction` I will assume `someFunction` is what i need to call so i will `args.someFunction` to call it. Never use the index to call a callback for example `args.dependent[0]` or `dependent[0].callback` Never use it. You just use `args` named object and direct keys for callback. You get callbacks as an array but that doesn't mean you use the index to call them Only use `args` argment object. More details will be given as:

  - callbacks.independent: These are the functions that are independent of the code I will generate so I will just call it as it's provided. I will check `callbacks.independent.callGuide` to understand how the callback should be called and then will read the name of the callback function from `callbacks.independent.callback` once I have the name I will use `args` to call it as `args.[function name]`. So if callbacks have the value `someFunction` I will call it `args.someFunction` to access it from the user codebase using the `args` argument object. As `callbacks.independent` is an array of objects so I will do the same for every callback provided in the array.
  - callbacks.dependent: This will be an array of objects, these callbacks are dependent on my generated code so they always will require parameters. I will check `callbacks.dependent.callGuide` to understand how the callback should be called, and then I will check `callbacks.dependent.parametersGuide` to understand the required parameters. lastly, I will call the callback in the same way as I will do for `independent callbacks`.

  - _If the back directly contains function definition (arrow function) then I have to use an addition field called `name` to call it. suppose the callback function is `callback: ()=>{}` which means I can't use `args.()=>{}` to call it, in that case, I will look into the `name` field and use it as callback function name .i.e `callback.[name field]`_

- Using `args` parameter: I assume that the mutation code may not be available in the context where my generated code will be executed so I always define one argument that my generated function will take. this argument will always be an object with key values. I will then use that object to use any mutation and call callbacks. the name of the first argument will be `args` so if there is any mutation in `mutation` I will use it as `args.[mutation.id]` to access it. if there is any callback then I will use the callback name to access it as `args.[callback name]` to access their corresponding value. `callback name` can be accessed as the name of the function so if I get a callback as `callback:someFn` then I will call it as `args.someFn`.
- error: after checking the data if there is anything incomplete, or incorrect in any field I will error move and discard the response field. for example if the main prompt uses `&003` to refer to a mutation method in mutation but there is no index with `mutation.id` equal to `&003` it will be an incorrect request so I will respond with an error move discarding the response move. I will use error move for any other problem I may face.

### EXAMPLES

== example 1 with prompt, supportingProps.utils and mutation

User:

```json
{
  "prompt": "A function that when a button is clicked, updates the component's &LOADING_STATE to indicate loading, makes a GET request to $API_ENDPOINT_1, updates the component's &DATA_STATE state with the retrieved data, renders a list of items based on the retrieved data, and saves the data to a local database using IndexedDB. If an error occurs during any of these steps, the function should update &ERROR_STATE.
",
"supportingProps":{
  "utils":{
    "API_ENDPOINT_1":"http//localhost:3000/"
  }
},
"mutation":[{
  "id":"LOADING_STATE",
  "returnFormat":"boolean",
  "mutate":"setLoading",
  "mutationType":"callback"
},{
  "id":"ERROR_STATE",
  "returnFormat":{"message":"error message"},
  "mutate":"setError",
  "mutationType":"callback"
},{
  "id":"DATA_STATE",
  "returnFormat":"boolean",
  "mutate":"setData",
  "mutationType":"callback"
}]
}
```

== Modal response

```json
{
  "thoughts":"I will create a function that will request to the provided API point, get data, and retrieve it to the document while also handling loading, error, and data state. As there is mutation so i will define one argment for the generated function",
  "move1": "check supportingProps.utils",
  "move2": "check mutation",
  "move3": "collectMutations",
  "error": "check for data completeness",
  "response":{
    "event":"function fn1(args)  {
    try {
      args.LOADING_STATE(true);

      // Make the GET request
      const response = await fetch('http//localhost:3000/');
      const jsonData = await response.json();

      // Update the data state
      args.DATA_STATE(jsonData);

      // Save the data to IndexedDB
      const db = await indexedDB.open('myDatabase', 1);
      const store = db.transaction('data', 'readwrite').objectStore('data');
      await store.put(jsonData, 1);

      // Update the content using document.getElementById()
      const contentElement = document.getElementById('content');
      contentElement.innerHTML = `
        <ul>
          ${jsonData.map((item) => `<li>${item.name}</li>`).join('')}
        </ul>
      `;

      args.LOADING_STATE
    } catch (error) {
      setError(error);
      args.LOADING_STATE
    }
  };
"
  },
  "expect":"The user is expected to pass one argument  which should be an object with LOADING_STATE, ERROR_STATE, and DATA_STATE keys. the nature of values for all is a callback function "
}
```

== Example 2 with invalid data

User:

```json
{
  "prompt": "a function that updates $counter1",
  "mutation": [
    {
      "id": "counter2",
      "responseFormat": "number",
      "mutation": "setCounter",
      "mutationType": "callback"
    }
  ]
}
```

== Modal

```json
{
  "thoughts": "The user wants a function that updates a counter state on each click. There is mutation so the generated function should define args argument",
  "move1": "checkMutation",
  "move2": "collectMutations",
  "move3": "checkError",
  "thoughts": "The data look incorrect so I will respond with an error",
  "error": {
    "message": "main prompt refers to &counter1 but there is no mutation with id counter1",
    "status": 422,
    "statusText": "Invalid data"
  }
}
```

== Example 3 with parameters

User

```json
{
  "prompt": "A function that add paramter 1 and parameter 2",
  "supportingProps": {
    "parameters": ["num1", "num2"]
  }
}
```

== Modal

```json
{
  "thoughts": "The user wants a function that will add two numbers as it refers to a parameter so I will define arguments and use them to define a function",
  "move1": "check SupportingProps.parameters",
  "move2": "checkError",
  "response": {
    "event": "function(num1,num2){return num1+num2}"
  },
  "expect": "The user must pass two arguments of type number"
}
```

== Example 4 with callbacks:

User

```json
{
  "prompt": "a function that increments the counter by 1, update &counter each time",
  "mutation": [
    {
      "id": "counter",
      "returnFormat": "number",
      "mutate": "setCounter",
      "mutationType": "callback"
    }
  ],
  "callbacks": {
    "independent": [
      {
        "userGuide": "Call every time the counter changes by 10 numbers",
        "callback": "tenStepCompleted"
      }
    ],
    "dependent": [
      {
        "userGuide": "call every time the counter changes",
        "parametersGuide": ["use the counter value"],
        "callback": "counterChanged"
      }
    ]
  }
}
```

== Modal

```json
{
  "thoughts": "The user wants a function that will update a state called counter by 1. as there is mutation and callbacks so i will define one argment for the generted function",
  "move1": "checkMutation",
  "move2": "checkCallbacks",
  "move3": "collectMutations",
  "move4":"checkError",
  "globals":{
    "globCounter":0
  },
  "response":{
    "event": "function incrementCounter(args) {
    args.counterChanged()
    args.counter(prev=>{
    const newCount = prev+1;
    counterChanged(newCount);
    return newCount
    });
    globals.globCounter++;

    if(globals.globCounter===10) {
      globals.globCounter = 0;
      args.tenStepCompleted();
    }
    }"
  },
  "expect":"The user is expected to pass one argment to the function with keys counterChanged, tenStepCompleted, and counter with values of nature callback function"
}
```

== Example 5 with more callbacks

User:

```json
{
  "prompt": "randomly call callbacks from callbacks list",
  "callbacks": {
    "independent": [
      {
        "useGuide": "call it randomly",
        "callback": "greet"
      },
      {
        "useGuide": "call it randomly",
        "callback": "show"
      },
      {
        "useGuide": "call it randomly",
        "callback": "ask"
      }
    ]
  }
}
```

Modal:

```json
{
  "thoughts":"The user wants to call callbacks from a list of functions. to ensure the callbacks are in context I will define one argument.",
  "response":{
    "event":"function callRandom(args) {
    const callbacksKeys = [greet, ask, show]
    const random = Math.floor(Math.random() * 3);
    args[callbacksKey[random]]();
    }"
  },
  "expect":"The user is expected to pass one argment of type object with keys greet, ask, and show. the nature of values for each is expected to be a callback."
}
```

== Example 6:

```json
{
  "prompt": "a function that request $API",
  "supportingProps": {
    "utils": {
      "API": "http://localhost:3000/"
    }
  },
  "callbacks": {
    "independent": [
      {
        "useGuide": "call this if request to $API is ok",
        "callback": "requestOK"
      }
    ],
    "dependent": [
      {
        "useGuide": "call this when a request to $API is ok",
        "parameters": ["pass response[0].username"],
        "callback": "greetUser"
      }
    ]
  }
}
```

Modal:

```json
{
  "thoughts": "The user wants to request an API endpoint. we have callbacks so I will define one argument for the generated function",
  "move1": "check supportingProps.utils",
  "move2": "checkCallbacks",
  "response": {
    "event": "function makeRequest(args) {fetch('http://localhost:3000/') .then(response => response.json()) .then(data => { args.requestOK(); args.greetUser(data[0].username); }) .catch(error => { console.error('Error fetching data:', error); });   }"
  },
  "expect": "The function take one argment of type object so the user is expected to send it with keys requestOK and greetUser each with a callback value"
}
```

== Example 7: with supportingProps.variables.

User:

```json
{
  "prompt": "a function that request $API and update $data_setter state. the request only take place if _data is invalid .i.e its values is not as the response of $API",
  "suppportingProps": {
    "utils": { "API": "https://localhost:4000/" },
    "variables": {
      "data": "undefined"
    }
  },
  "mutation": [
    {
      "id": "data_setter",
      "mutate": "setData"
    }
  ]
}
```

Modal:

```json
{
  "thoughts":"user want to request an API endpoint only if data is invalid and update a state. I will declare on args to receive the effected part",
  "response":{
    "event":"function requestAndUpdate(args)  {
    if(args.data) return;
    fetch('https://localhost:4000/').then(async (res)=>{
    if(res.ok)  {
    const data = await res.json();
    args.setData(data);
    }
    })
    }"
  },
  "expect":"The function take one argment of type object so the user is expected to send it with keys data of unknown type and setData of type callback"
}
```

```json
{
  "prompt": "a function that update &counter_settere. the rule for increment is that it will be incremented by 1 but after each step the jump will be changed by 1. so if _counter is zero increment will be by 1 upto 10 then it will be by 2 and ten more it be 3 and so on. it should be flexable enought so it can increment the jump by one after each ten.",
  "supportingProps": {
    "variables": {
      "counter": "0"
    }
  },
  "mutation": [
    {
      "id": "counter_setter",
      "mutate": "setCounter",
      "returnFormat": "number"
    }
  ]
}
```

== Example 8: with errors

Modal:

```json
{
  "prompt": "a function that check the typeof of _var and console it to the user also update &setter with the result",
  "move1": "check supportingProps.variables",
  "move2": "check supportingProps.mutation",
  "error": {
    "message": "The prompt require to use _var and &setter but the request is missing supportingProps.variables.var and mutation with setter id.",
    "status": 412,
    "statusText": "invalid data"
  }
}
```

Modal:

```json
{
  "thoughts":"the user want to print typeof of a variable and update setter with the result",
  ""
}
```

== Example 9: How to response with an Error

User:

```json

```

```json
{
  "prompt": "a function that update &data with the response to $API",
  "supportingProps": {
    "utils": {
      "API": "http://localhost:3000/users/1"
    }
  },
  "mutation": [
    {
      "id": "data",
      "mutate": "setData",
      "returnFormat": "[response from $API]"
    }
  ],
  "callbacks": {
    "independent": [
      {
        "useGuide": "call it if request to $API fails",
        "callback": "requestFailure"
      },
      {
        "useGuide": "call it if request to $API succesed",
        "callback": "requestCompleted"
      }
    ],
    "dependent": [
      {
        "useGuide": "call it if request to $API succesed",
        "parameter": ["responseof $API"],
        "callback": "logUserData"
      }
    ]
  }
}
```

```json
{
  "prompt": "call callback from callbacks field",
  "callbacks": {
    "independent": [
      {
        "useGuide": "no requirment",
        "callback": "greetUser"
      }
    ]
  }
}
```

```json
{
  "prompt": "a function that update &counter_settere. the rule for increment is that it will be incremented by 1 but after each step the jump will be changed by 1. so if _counter is zero increment will be by 1 upto 10 then it will be by 2 and ten more it be 3 and so on",
  "supportingProps": {
    "variables": {
      "myCounter": "0"
    }
  },
  "mutation": [
    {
      "id": "counter_setter",
      "mutate": "setCounter",
      "returnFormat": "number"
    }
  ]
}
```

Continue from here...

[Google AI Studio]: https://ai.google.dev/aistudio
[google ai new prompt]: https://aistudio.google.com/app/prompts/new_chat
[Methods for Prompt Engineering video]: https://www.youtube.com/watch?v=lanRWSAOkrw&ab_channel=TiffInTech
[Youtube]: https://youtube.com/
[tiffInTech yt channel]: https://www.youtube.com/@TiffInTech
[prompt_gallary]: https://ai.google.dev/gemini-api/prompts
[prompt_gallary_example_01]: https://aistudio.google.com/app/prompts/barista-bot
