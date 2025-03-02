import { AIFormProps, EnhancedComponentProps } from "@types";
import stars from "@public/re-generate.svg";
import React from "react";
import enhanceWithAI from "../enhanceWithAI";
import Loader from "../loader/Loader";
import { StyledNoStyleButton } from "@styles/StylesCommon";
import { StyledRegenerateIcon } from "@styles/StylesAIButton";
const AIForm: React.FC<AIFormProps> = enhanceWithAI((props: AIFormProps) => {
  const {
    event,
    handleEvent,
    targetRef,
    attributes,
    loading,
    refreshResponse,
  } = props as EnhancedComponentProps<AIFormProps, HTMLFormElement>;

  const eventListener: React.DOMAttributes<HTMLFormElement> = {
    [props?.listener || "onSubmit"]: event ? handleEvent : undefined,
  };
  return (
    <form
      ref={targetRef}
      className={props.filename}
      {...eventListener}
      {...attributes}
    >
      {loading && <Loader />}
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
      {props.children}
    </form>
  );
}, "form");

export default AIForm;
