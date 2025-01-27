import React from "react"
import stars from "@public/re-generate.svg";
import withAIEvents from '@src/hooks/withAIEvents';
import { AIInputProps } from '@types';
import { StyledRegenerateIcon } from "@styles/StylesAIButton";
import {
  StyledComponentsWrapper,
  StyledNoStyleButton,
} from "@styles/StylesCommon";
import Loader from './loader/Loader';
import generateResponse from '@utils/generateResponse';


const Input: React.FC<AIInputProps> = withAIEvents((props: AIInputProps) => {
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
}) as React.FC<AIInputProps>;


export default Input;