import React from "react";
import { AIButtonProps } from "@/types/index";
import Loader from "@components/loader/Loader";
import stars from "@public/re-generate.svg";
import { StyledAIButton, StyledRegenerateIcon } from "@styles/StylesAIButton";
import {
  StyledNoStyleButton,
  StyledComponentsWrapper,
} from "@styles/StylesCommon";
import enhanceWithAI from "../enhanceWithAI";

export const AIButton: React.FC<AIButtonProps> = enhanceWithAI((props: AIButtonProps) => {
  const {
    handleEvent,
    loading,
    event,
    refreshResponse,
    targetRef, 
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
        ref={targetRef}
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

export default AIButton