import React from "react";
import stars from "@public/re-generate.svg";
import { StyledRegenerateIcon } from "@styles/StylesAIButton";
import {
  FileNameTag,
  StyledComponentsWrapper,
  StyledNoStyleButton,
} from "@styles/StylesCommon";
import { AIInputProps, EnhancedComponentProps } from "@types";
import Loader from "../loader/Loader";
import enhanceWithAI from "../enhanceWithAI";

const AIInputBase = (props: AIInputProps) => {
  const {
    on,
    handleEvent,
    loading,
    event,
    refreshResponse,
    targetRef,
    attributes,
  } = props as EnhancedComponentProps<AIInputProps, HTMLInputElement>;

  // const storeInputValue = () => {
  //   if (!targetRef.current || !props.filename) return;

  //   const prevInputValues = JSON.parse(
  //     localStorage.getItem("AIInputValuesRecord") || "{}"
  //   );

  //   if (props.type === "radio") {
  //     const [value, name] = [attributes?.value, attributes?.name];
  //     if (!value || !name) return;
  //     localStorage.setItem(
  //       "AIInputValuesRecord",
  //       JSON.stringify({ ...prevInputValues, [`radio_${name}`]: value })
  //     );
  //     return;
  //   }

  //   if (props.type === "password" || props.type === "file") return;

  //   if (props.type === "checkbox") {
  //     const [name, value, checked] = [
  //       attributes?.name,
  //       attributes?.value,
  //       targetRef.current.checked,
  //     ];
  //     if (!name || value === undefined) return;
  //     let checkedValues = prevInputValues[name] || [];
  //     checked
  //       ? !checkedValues.includes(value) && checkedValues.push(value)
  //       : (checkedValues = checkedValues.filter((v: string) => v !== value));

  //     localStorage.setItem(
  //       "AIInputValuesRecord",
  //       JSON.stringify({
  //         ...prevInputValues,
  //         [name]: checkedValues,
  //       })
  //     );
  //     return;
  //   }

  //   const newInputValues = JSON.stringify({
  //     ...prevInputValues,
  //     [`${props.filename}_${props.type}`]: targetRef.current.value,
  //   });

  //   localStorage.setItem("AIInputValuesRecord", newInputValues);
  // };
  // ? props.listener === "onChange" && /radio|checkbox/.test(props.type)
  //   ? (e: any) => {
  //       storeInputValue();
  //       handleEvent(e);
  //     }
  //   : props.listener === "onBlur"
  //     ? (e: any) => {
  //         storeInputValue();
  //         handleEvent(e);
  //       }
  //     : handleEvent
  // : undefined,

  const eventListener: Partial<
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "onBlur">
  > & {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  } = React.useMemo(() => {
    return {
      defaultValue: !/radio|checkbox/.test(props.type)
        ? localStorage.getItem(`${props.filename}_${props.type}`) || undefined
        : undefined,
      [props.listener || "onChange"]: event ? handleEvent : undefined,
    };
  }, [props.listener, event]);

  return (
    <>
      <input
        // onBlur={storeInputValue}
        ref={targetRef}
        type={props.type || "text"}
        {...on}
        {...eventListener}
        {...attributes}
        disabled={loading}
      />
      <StyledComponentsWrapper>
        {(props.cacheResponse == false || loading) && (
          <FileNameTag>{props.filename + ".js"}: </FileNameTag>
        )}
        {props.cacheResponse === false && (
          <StyledNoStyleButton disabled={loading}>
            <StyledRegenerateIcon
              src={stars}
              alt="re-generate"
              title="Re-generate"
              onClick={refreshResponse}
            />
          </StyledNoStyleButton>
        )}
        {loading && <Loader />}
      </StyledComponentsWrapper>
    </>
  );
};

/**
 * @description
 * AIInput is a React functional component that renders an input field with AI-enhanced capabilities.
 * It supports various props to handle events, loading states, and custom attributes.
 * @component
 * @param {boolean} [cacheResponse=true] - Indicates whether to cache the response from the AI. If set to false, it creates a button beside the element which, when clicked, sends another request to generate code (a refresh button). The default value `true` hides the button.
 * @param {string} prompt - The prompt to be sent to the AI.
 * @param {string} filename - Name for the file to be created (without extension).
 * @param {string} listener - The name of the event listener to attach (e.g., "onChange", "onBlur").
 * @param {React.HTMLInputTypeAttribute} type - The type of the input element (e.g., "text", "password").
 * @param {React.HTMLAttributes<HTMLInputElement>} [htmlAttributes] - Additional HTML attributes for the input element.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} [attributes] - Specific HTML input attributes.
 * @param {object} [supportingProps] - Additional information like aliases or context from the user codebase that should be used in the AI-generated code.
 * @param {object} [supportingProps.utils] - Key-value pairs where the key is a placeholder in the prompt prefixed with '$', and the value is its actual meaning.  Example: `{ API: "https://localhost:3000" }` if the prompt uses `$API`.
 * @param {object} [supportingProps.database] - Used when the prompt describes some database-related information. It's an object with two keys: `name` (required) - the name of the operation (e.g., "firebase", "firebase authentication"), and `envGuide` (optional) - to describe how the generated code will access secrets (e.g., connection details).
 * @param {object} [supportingProps.variables] - Used to store context from the user codebase.  Variables in the prompt should be prefixed with "_". Example: `{ list: [] }` if the generated code needs a `list` variable.
 * @param {Array<object>} [mutation] - An array of mutation objects that the generated code should perform, like updating a state value or reassigning a variable.
 * @param {string} [mutation[].id] - A unique ID for the mutation.
 * @param {any} [mutation[].returnFormat] - The format in which the mutation should be done. For example, if updating a state, the desired structure of the new state value.
 * @param {any} [mutation[].mutate] - The mutation function or value.  For state updates, pass the `setState` function. For variable assignment, pass the variable reference.
 * @param {string} [mutation[].mutationType] - The type of mutation: `"callback"` or `"assignment"`. If `"callback"`, `mutation[].mutate` is called. If `"assignment"`, `mutation[].mutate` is assigned using `=`.
 * @param {object} [callbacks] - An object containing callback functions that the generated code should call when certain conditions are met.
 * @param {Array<object>} [callbacks.independent] - An array of independent callback objects (functions that take no arguments).
 * @param {string} [callbacks.independent[].callGuide] - A guide for when to call the callback.
 * @param {Array<object>} [callbacks.dependent] - An array of dependent callback objects (functions that require data from the generated code).
 * @param {string} [callbacks.dependent[].callGuide] - A guide for when to call the callback.
 * @param {Array<string>} [callbacks.dependent[].parametersGuide] - An array of guides for the parameters to pass to the callback. Each index corresponds to a parameter.
 * @param {Function} [callbacks.dependent[].callback] - The dependent callback function.
 * @param {(target: HTMLInputElement) => void | string} [props.onInit] - A function or a prompt string to be executed after the input is initialized. If it's a function, it will be called with the input element as the first argument. If it's a string, it will be treated as a prompt for the AI to generate a function that will be executed on the first render.  If it's a function, it must accept one argument, the HTMLInputElement.
 * @example
 * <AIInput
 *   cacheResponse={false}
 *   prompt={`
 *     Generate a JavaScript function that validates an email address.
 *     Use the provided regular expression '$REGEX_EMAIL' to perform the validation.
 *     update the '_isValid' variable to true if the email is valid, and false otherwise.
 *     set the '_email' to the validated email address.
 *     Use the database configuration (name and envGuide) from the 'database' object in the supportingProps to log the database being used.
 *     '&updateIsValid' to update the _isValid variable.
 *     '&setEmail' should be used to set the _email variable.
 *   `}
 *   filename="emailValidator"
 *   listener="onBlur"
 *   type="email"
 *   htmlAttributes={{ className: 'email-input', placeholder: 'Enter your email' }}
 *   attributes={{ 'data-testid': 'email-input' }}
 *   supportingProps={{
 *     utils: { $REGEX_EMAIL: "/^[^\s@]+@[^\s@]+\.[^\s@]+$/" },
 *     database: { name: 'Firebase', envGuide: 'process.env.DB_CONNECTION' },
 *     variables: { _isValid: false, _email: "" },
 *   }}
 *   mutation={[
 *     { id: 'updateIsValid', returnFormat: 'boolean', mutate: (value) =>, mutationType: 'callback' },
 *     { id: 'setEmail', returnFormat: 'string', mutate: '_email', mutationType: 'assignment' },
 *   ]}
 *   callbacks={{
 *     independent: [{ callGuide: 'onSuccess', callback: () => { console.log('Email validation successful'); } }],
 *     dependent: [
 *       {
 *         callGuide: 'onFailure',
 *         parametersGuide: ['errorMessage'],
 *         callback: (errorMessage) => { console.error('Email validation failed:', errorMessage); },
 *       },
 *     ],
 *   }}
 *   onInit={(target) => {
 *     target.focus(); // Focus the input on initialization
 *     console.log("Input initialized", target);
 *   }}
 * />
 * @returns {JSX.Element} The rendered AIInput component.
 */
const AIInput = enhanceWithAI(AIInputBase, "input");

export default AIInput;
// ? LOGIC TO BE DELETE
// const AIInput = enhanceWithAI((props: AIInputProps) => {
//   const {
//     handleEvent,
//     loading,
//     event,
//     targetRef,
//     refreshResponse,
//     attributes,
//   } = props as EnhancedComponentProps<AIInputProps, HTMLInputElement>;

//   // * caching input value
//   const storeInputValue = () => {
//     if (!targetRef.current || !props.filename) return;

//     const prevInputValues = JSON.parse(
//       localStorage.getItem("AIInputValuesRecord") || "{}"
//     );

//     // Handle radio inputs
//     if (props.type === "radio") {
//       const [value, name, required] = [
//         attributes?.value,
//         attributes?.name,
//         attributes?.required,
//       ];
//       if (!value && !name && !required) return;
//       localStorage.setItem(
//         "AIInputValuesRecord",
//         JSON.stringify({ ...prevInputValues, [`radio_${name}`]: value })
//       );
//       return;
//     }

//     // Avoid storing sensitive input types
//     if (props.type === "password" || props.type === "file") return;

//     if (props.type === "checkbox") {
//       const [name, value, checked] = [
//         attributes?.name,
//         attributes?.value,
//         targetRef.current.checked,
//       ];
//       if (value === undefined || name === undefined) return;
//       let checkedValues = prevInputValues[name] || [];
//       checked
//         ? !checkedValues.includes(value) && checkedValues.push(value)
//         : (checkedValues = checkedValues.filter((v: string) => v !== value));

//       localStorage.setItem(
//         "AIInputValuesRecord",
//         JSON.stringify({
//           ...prevInputValues,
//           [name]: checkedValues,
//         })
//       );

//       return;
//     }

//     // Store other input types normally
//     const newInputValues = JSON.stringify({
//       ...prevInputValues,
//       [`${props.filename}_${props.type}`]: targetRef.current.value,
//     });

//     localStorage.setItem("AIInputValuesRecord", newInputValues);
//   };

//   // * Create key to access value in localstorage
//   const getStoredInputValue = (): string | undefined => {
//     if (!targetRef.current || !props.filename) return undefined;

//     const prevInputValues = JSON.parse(
//       localStorage.getItem("AIInputValuesRecord") || "{}"
//     );

//     // Avoid retrieving values for sensitive input types
//     if (props.type === "password" || props.type === "file") return undefined;

//     // Handle radio input
//     if (props.type === "radio") {
//       const name = attributes?.name;
//       if (!name) return undefined; // If name is missing, skip retrieval
//       const key = `radio_${name}`;
//       return prevInputValues[key] ?? undefined;
//     }
//     // Handle checkbox (Placeholder for future implementation)
//     if (props.type === "checkbox") {
//       const name = attributes?.name;
//       if (!name) return undefined;

//       return prevInputValues[name] || [];
//     }

//     // Retrieve value for normal input types
//     const key = `${props.filename}_${props.type}`;
//     return prevInputValues[key] ?? undefined;
//   };

//   const [checked, setChecked] = React.useState<string | undefined>("");
//   React.useEffect(() => {
//     if (!(targetRef.current || props.type == "radio")) return;
//     setChecked(getStoredInputValue());
//   }, [targetRef.current]);

//   React.useEffect(() => {
//     if (
//       !targetRef.current ||
//       !attributes?.name ||
//       !/radio|checkbox/.test(props.type)
//     )
//       return;
//     const radiosSet = Array.from(
//       document.querySelectorAll(`input[name='${attributes?.name}']`)
//     ) as HTMLInputElement[];
//     radiosSet.forEach((radio) => {
//       radio.checked = Array.isArray(checked)
//         ? checked.includes(radio.value)
//         : radio.value == checked;
//     });
//   }, [checked]);

//   const eventListener: Partial<
//     Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "onBlur">
//   > & {
//     onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
//     onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
//   } = React.useMemo(() => {
//     return {
//       defaultValue: !/radio|checkbox/.test(props.type)
//         ? getStoredInputValue()
//         : undefined,
//       [props.listener || "onChange"]: event
//         ? props.listener == "onChange" && /radio|checkbox/.test(props.type)
//           ? (e: any) => {
//               storeInputValue();
//               handleEvent(e);
//               setChecked(
//                 props.type == "checkbox"
//                   ? getStoredInputValue()
//                   : attributes?.value?.toString()
//               );
//             }
//           : props.listener == "onBlur"
//             ? (e: any) => {
//                 storeInputValue();
//                 handleEvent(e);
//               }
//             : handleEvent
//         : undefined,
//     };
//   }, [props.listener, event]);

//   return (
//     <StyledComponentsWrapper>
//       <span>
//         <input
//           onBlur={storeInputValue}
//           ref={targetRef}
//           type={props.type || "text"}
//           {...eventListener}
//           // {...props.htmlAttributes}
//           {...attributes}
//           disabled={loading}
//         />
//       </span>
//       {loading && <Loader />}
//       {props.cacheResponse == false && (
//         <StyledNoStyleButton disabled={loading}>
//           <StyledRegenerateIcon
//             src={stars}
//             alt="re-generate"
//             title="Re-generate"
//             onClick={refreshResponse}
//           />
//         </StyledNoStyleButton>
//       )}
//     </StyledComponentsWrapper>
//   );
// }, "input") as React.FC<AIInputProps>;
