import React from "react"
import stars from "@public/re-generate.svg";
import enhanceWithAI from '@src/components/enhanceWithAI';
import { AIButtonProps, AIInputProps } from '@types';
import { StyledAIButton, StyledRegenerateIcon } from "@styles/StylesAIButton";
import {
  StyledComponentsWrapper,
  StyledNoStyleButton,
} from "@styles/StylesCommon";
import Loader from './loader/Loader';
import generateResponse from '@utils/generateResponse';


const Input: React.FC<AIInputProps> = enhanceWithAI((props: AIInputProps) => {
  const { 
    handleEvent, 
    loading, 
    error, 
    event, 
    // responseMeta, 
    targetRef, 
    // refreshResponse,
    // ...rest 
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
            onClick={() =>
              generateResponse(loading, error, {
                ...props,
                element: "input",
              })
            }
          />
        </StyledNoStyleButton>
      )}
    </StyledComponentsWrapper>
  );
},"input") as React.FC<AIInputProps>;


export const Button: React.FC<AIButtonProps> = enhanceWithAI((props: AIButtonProps) => {
  const {
    handleEvent,
    loading,
    // error,
    event,
    // responseMeta,
    refreshResponse,
    ...rest
  } = props;

  const eventListener: React.DOMAttributes<HTMLButtonElement> = {
      [props?.listner || "onClick"]: event
        ? handleEvent
        : undefined,
    };

  return (
    <StyledComponentsWrapper>
      <StyledAIButton
        {...eventListener}
        {...rest.htmlAttributes}
        {...rest.attributes}
        disabled={loading}
      >
        {loading ? (
          <Loader />
        ) : (
          <span className="text">{props.label || "AIButton"}</span>
        )}
      </StyledAIButton>
      {props.cacheResponse == false && (
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
},"button");



export default Input;