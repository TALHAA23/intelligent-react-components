import React from "react";
import stars from "@public/re-generate.svg";
import { StyledRegenerateIcon } from "@styles/StylesAIButton";
import {
  StyledComponentsWrapper,
  StyledNoStyleButton,
} from "@styles/StylesCommon";
import { AIInputProps } from "@types";
import Loader from "../loader/Loader";
import enhanceWithAI from "../enhanceWithAI";



/**
 * AIInput is a React functional component that renders an input field with AI-enhanced capabilities.
 * It supports various props to handle events, loading states, and custom attributes.
 * @component
 * @param {boolean} [cacheResponse=true] - Indicates whether to cache the response from the AI. If set to false, it creates a button beside the element which, when clicked, sends another request to generate code (a refresh button). The default value true hides the button.
 * @param {string} prompt - The prompt to be sent to the AI.
 * @param {string} filename - Name for the file to be created.
 * @param {string} listener - The name of the event listener to attach (e.g., "onChange", "onBlur").
 * @param {React.HTMLInputTypeAttribute} type - The type of the input element (e.g., "text", "password").
 * @param {React.HTMLAttributes<HTMLInputElement>} [htmlAttributes] - Additional HTML attributes for the input element.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} [attributes] - Additional custom attributes for the input element.
 * @param {object} [supportingProps] - Additional information like aliases or context from the user codebase that should be used in the AI-generated code.
 * @param {object} [supportingProps.utils] - If the prompt says 'request to $API', the address should be written here to keep the prompt clean, e.g., utils: { API: "https://localhost:3000" }. Utils should be prefixed with '$'.
 * @param {object} [supportingProps.database] - Used where the prompt describes some database-related information. It's an object with two keys: name (required) - the name of the operation like firebase or firebase authentication, and envGuide (optional) - to describe how the generated code will access the secrets like connection details.
 * @param {object} [supportingProps.variables] - Used to store context from the user codebase. For example, if the user has a variable list = [] and the generated code needs it to work, then it should be declared here like variables: { list: [] }. Variables in the prompt should be prefixed with "_".
 * @param {Array<object>} [mutation] - Array of mutation objects for data transformation.
 * @param {string} [mutation[].id] - ID of the mutation.
 * @param {any} [mutation[].returnFormat] - Format of the returned data.
 * @param {any} [mutation[].mutate] - Mutation function or logic.
 * @param {string} [mutation[].mutationType] - Type of mutation ("callback" or "assignment").
 * @param {object} [callbacks] - Object containing callback functions.
 * @param {Array<object>} [callbacks.independent] - Array of independent callback objects.
 * @param {string} [callbacks.independent[].callGuide] - Guide for calling the callback.
 * @param {Function} [callbacks.independent[].callback] - Independent callback function.
 * @param {Array<object>} [callbacks.dependent] - Array of dependent callback objects.
 * @param {string} [callbacks.dependent[].callGuide] - Guide for calling the callback.
 * @param {Array<string>} [callbacks.dependent[].parametersGuide] - Guides for parameters.
 * @param {Function} [callbacks.dependent[].callback] - Dependent callback function.
 * @param {(target: HTMLInputElement, ...args: any[]) => void | string} [onInit] - Function to be called after the input is initialized.
 * @example
 * <AIInput
 *   cacheResponse={false}
 *   prompt="A function that validates the password..."
 *   filename="passwordInput"
 *   listener="onBlur"
 *   type="password"
 *   htmlAttributes={{ className: 'my-input' }}
 *   attributes={{ 'data-testid': 'password-input' }}
 *   supportingProps={{
 *     utils: { helperFunction: () => {} },
 *     database: { name: 'users', envGuide: 'production' },
 *     variables: { setting: true },
 *   }}
 *   mutation={[{ id: 'updatePassword', returnFormat: 'json' }]}
 *   callbacks={{
 *     independent: [{ callGuide: 'onSuccess', callback: () => {} }],
 *     dependent: [{ callGuide: 'onError', parametersGuide: ['error'], callback: () => {} }],
 *   }}
 *   onInit={(target) => { console.log('Input initialized:', target); }}
 * /> 
 * @returns {JSX.Element} The rendered AIInput component.
 */
const AIInput: React.FC<AIInputProps> = enhanceWithAI((props: AIInputProps) => {
  const { 
    handleEvent, 
    loading, 
    event, 
    targetRef, 
    refreshResponse,
  } = props;


  const eventListener: React.DOMAttributes<HTMLInputElement> = React.useMemo(() => ({
      [props?.listener || "onChange"]: event
        ? handleEvent
        : undefined,
    }), [event, props?.listener]);

  return (
    <StyledComponentsWrapper>
      <span>
        <input
        ref={targetRef}
          type={props.type || "text"}
          {...eventListener}
          {...props.htmlAttributes}
          {...props.attributes}
          disabled={loading}
        />
      </span>
      {loading && <Loader />}
      {props.cacheResponse == false && (
        <StyledNoStyleButton disabled={loading}>
          <StyledRegenerateIcon
            src={stars}
            alt="re-generate"
            title="Re-generate"
            onClick={refreshResponse
            }
          />
        </StyledNoStyleButton>
      )}
    </StyledComponentsWrapper>
  );
},"input") as React.FC<AIInputProps>;

export default AIInput