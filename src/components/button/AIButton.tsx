import React from "react";
import { AIButtonProps, EnhancedComponentProps } from "@/types/index";
import Loader from "@components/loader/Loader";
import stars from "@public/re-generate.svg";
import { StyledAIButton, StyledRegenerateIcon } from "@styles/StylesAIButton";
import {
  StyledNoStyleButton,
  StyledComponentsWrapper,
} from "@styles/StylesCommon";
import enhanceWithAI from "../enhanceWithAI";

const AIButtonBase = (props: AIButtonProps) => {
  const { handleEvent, loading, event, refreshResponse, targetRef, ...rest } =
    props as EnhancedComponentProps<AIButtonProps, HTMLButtonElement>;

  const eventListener: React.DOMAttributes<HTMLButtonElement> = {
    [props?.listener || "onClick"]: event ? handleEvent : undefined,
  };

  return (
    <StyledComponentsWrapper>
      <StyledAIButton
        ref={targetRef}
        {...eventListener}
        {...rest.attributes}
        disabled={loading}
      >
        {loading ? (
          <Loader />
        ) : (
          <span className="text">{props.label || "AIButton"}</span>
        )}
      </StyledAIButton>
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
    </StyledComponentsWrapper>
  );
};

/**
 * AIButton is a React functional component that renders a button with AI-enhanced capabilities.
 * It leverages the `enhanceWithAI` Higher-Order Component (HOC) to manage state, handle events,
 * and interact with AI functionalities.
 *
 * @component
 * @param {AIButtonProps} props - The properties passed to the component.
 * @param {boolean} [props.cacheResponse=true] - Indicates whether to cache the response from the AI.
 *                                            If set to false, it creates a button beside the element
 *                                            which, when clicked, sends another request to generate code
 *                                            (a refresh button). The default value `true` hides the button.
 * @param {string} props.prompt - The prompt to be sent to the AI.
 *                                For example:
 *                                  "A function that disable the button after first click"
 * @param {string} props.filename - Name for the file to be created (without extension).
 *                                  This filename is used to dynamically import the AI logic.
 *                                  For example: "dynamicButtonLabel"
 * @param {string} props.listener - The name of the event listener to attach (e.g., "onClick").
 * @param {string} [props.label] - The label for the button.
 * @param {React.HTMLAttributes<HTMLButtonElement>} [props.htmlAttributes] - Additional HTML attributes for the button element.
 *                                  For example: `{ className: 'primary-button', disabled: true }`
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} [props.attributes] - Specific HTML attributes for the button element.
 *                                  For example: `{ 'data-testid': 'submit-button' }`
 * @param {object} [props.supportingProps] - Additional information like aliases or context from the user codebase
 *                                          that should be used in the AI-generated code.
 * @param {object} [props.supportingProps.utils] - Key-value pairs where the key is a placeholder in the prompt
 *                                              prefixed with '$', and the value is its actual meaning.
 *                                              Example: `{ $currentDate: new Date().toLocaleDateString() }`
 *                                              to include the current date in the generated label.
 * @param {object} [props.supportingProps.database] - Used when the prompt describes some database-related information.
 *                                              It's an object with two keys:
 *                                                  - `name` (required) - the name of the operation (e.g., "firebase", "firebase authentication").
 *                                                  - `envGuide` (optional) - a hint or guide on how the generated code will access secrets
 *                                                                   (e.g., connection details, environment variables).
 * @param {Array<object>} [props.mutation] - An array of mutation objects that the generated code should perform,
 *                                          like updating a state value or reassigning a variable.
 * @param {string} [props.mutation[].id] - A unique ID for the mutation.
 * @param {any} [props.mutation[].returnFormat] - The format in which the mutation should be done.
 *                                              For example, if updating a state, the desired structure of the new state value.
 * @param {any} [props.mutation[].mutate] - The mutation function or value.
 *                                          For state updates, pass the `setState` function.
 *                                          For variable assignment, pass the variable reference.
 * @param {string} [props.mutation[].mutationType] - The type of mutation:
 *                                                  - `"callback"`: `mutation[].mutate` is called as a function.
 *                                                  - `"assignment"`: `mutation[].mutate` is assigned using `=`.
 * @param {object} [props.callbacks] - An object containing callback functions that the generated code should call
 *                                     when certain conditions are met.
 * @param {Array<object>} [props.callbacks.independent] - An array of independent callback objects
 *                                                        (functions that take no arguments).
 * @param {string} [props.callbacks.independent[].callGuide] - A guide for when to call the callback.
 * @param {Array<object>} [props.callbacks.dependent] - An array of dependent callback objects
 *                                                      (functions that require data from the generated code).
 * @param {string} [props.callbacks.dependent[].callGuide] - A guide for when to call the callback.
 * @param {Array<string>} [props.callbacks.dependent[].parametersGuide] - An array of guides for the parameters
 *                                                                   to pass to the callback.
 *                                                                   Each index corresponds to a parameter.
 * @param {Function} [props.callbacks.dependent[].callback] - The dependent callback function.
 * @param {(target: HTMLButtonElement) => void | string} [props.onInit] - A function or a prompt string to be executed
 *                                                                 after the button is initialized.
 *                                                                 If it's a function, it will be called with the
 *                                                                 initialized button element as the first argument.
 *                                                                 If it's a string, it will be treated as a prompt
 *                                                                 for the AI to generate a function that will be executed
 *                                                                 on the first render.
 *                                                                 For example: "Add a click event listener to the button."
 * @example
 * <AIButton
 *   cacheResponse={false}
 *   prompt={`Generate a concise button label based on the provided button's purpose
 *            and the current context.
 *            Consider using clear and concise language that is easy for users to understand.
 *            The button's purpose is to 'Submit Form'.
 *            The current context is a user registration form.
 *            The button should be visually appealing and encourage user interaction.
 *            Incorporate the current date and time in the label.`}
 *   filename="submitButtonLabel"
 *   listener="onClick"
 *   label="Submit"
 *   htmlAttributes={{ className: 'primary-button' }}
 *   attributes={{ 'data-testid': 'submit-button' }}
 *   supportingProps={{
 *     utils: { $currentDate: new Date().toLocaleDateString() }
 *   }}
 *   mutation={[
 *     {
 *       id: 'updateLoadingState',
 *       returnFormat: 'boolean',
 *       mutate: setLoading,
 *       mutationType: 'callback'
 *     }
 *   ]}
 *   callbacks={{
 *     independent: [{
 *       callGuide: 'onLabelGenerated',
 *       callback: () => {
 *         console.log('Button label generated successfully');
 *       }
 *     }]
 *   }}
 *   onInit={(target) => {
 *     target.disabled = false;
 *   }}
 * />
 */
const AIButton = enhanceWithAI(AIButtonBase, "button");

export default AIButton;

// ? LOGIC TO BE DELTED
// export const AIButton: React.FC<AIButtonProps> = enhanceWithAI(
//   (props: AIButtonProps) => {
//     const { handleEvent, loading, event, refreshResponse, targetRef, ...rest } =
//       props as EnhancedComponentProps<AIButtonProps, HTMLButtonElement>;

//     const eventListener: React.DOMAttributes<HTMLButtonElement> = {
//       [props?.listener || "onClick"]: event ? handleEvent : undefined,
//     };

//     return (
//       <StyledComponentsWrapper>
//         <StyledAIButton
//           ref={targetRef}
//           {...eventListener}
//           {...rest.attributes}
//           disabled={loading}
//         >
//           {loading ? (
//             <Loader />
//           ) : (
//             <span className="text">{props.label || "AIButton"}</span>
//           )}
//         </StyledAIButton>
//         {props.cacheResponse == false && (
//           <StyledNoStyleButton disabled={loading}>
//             <StyledRegenerateIcon
//               src={stars}
//               alt="re-generate"
//               title="Re-generate"
//               onClick={refreshResponse}
//             />
//           </StyledNoStyleButton>
//         )}
//       </StyledComponentsWrapper>
//     );
//   },
//   "button"
// );

// export default AIButton;
