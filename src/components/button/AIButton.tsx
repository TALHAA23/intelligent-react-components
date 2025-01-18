import React from "react";
import { AIButtonProps } from "@/types/index";
import Loader from "@components/loader/Loader";
import processAIButtonProps from "@/utils/processAIButtonProps";
import stars from "@public/re-generate.svg";
import createIrcRegisteryUseableUseEffects from "./useEffects.hook";
import { StyledAIButton, StyledRegenerateIcon } from "@styles/StylesAIButton";
import {
  StyledNoStyleButton,
  StyledComponentsWrapper,
} from "@styles/StylesCommon";
import generateResponse from "@utils/generateResponse";
interface MyModule {
  default: (event: MouseEvent, ...args: unknown[]) => unknown;
  meta?: any;
}

export default function AIButton({
  cacheResponse = true,
  element = "button",
}: AIButtonProps) {
  const props = arguments[0];
  element = "button";
  console.log(element);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<any>(undefined);
  const [event, setEvent] = React.useState<undefined | MyModule>(undefined);
  const [responseMeta, setResponseMeta] = React.useState<
    undefined | MyModule["meta"]
  >(event?.meta);
  const args = processAIButtonProps(props);
  const eventListner: React.DOMAttributes<HTMLButtonElement> = {
    [props?.listner || "onClick"]: event
      ? (e: MouseEvent) => event.default(e, args ? args : undefined)
      : undefined,
  };
  React.useEffect(() => {
    const getEvent = async () => {
      try {
        setLoading(true);
        const event = await import(
          // `../../../../nextjs-genkit/dynamic/${props.filename}.js`
          // `../../../dynamic/${props.filename}.js`
          `/dynamic/${props.filename}.js`
        );
        setEvent(event);
        setResponseMeta(event.meta);
      } catch (err) {
        console.log(err);
        await generateResponse(setLoading, setError, props);
      } finally {
        setLoading(false);
      }
    };
    getEvent();
  }, []);

  createIrcRegisteryUseableUseEffects({
    props,
    loading,
    event,
    refreshResponse: () => generateResponse(setLoading, setError, props),
    error,
    responseMeta,
  });
  // ! Attention required: The Button is Styled hardcoded and users might not be able to change its styles
  return (
    <StyledComponentsWrapper>
      <StyledAIButton
        {...eventListner}
        {...props.htmlAttributes}
        disabled={loading}
      >
        {loading ? (
          <Loader />
        ) : (
          <span className="text">{props.label || "AIButton"}</span>
        )}
      </StyledAIButton>
      {!cacheResponse && (
        <StyledNoStyleButton
          disabled={loading}
          onClick={() => generateResponse(setLoading, setError, props)}
        >
          <StyledRegenerateIcon
            src={stars}
            alt="re-generate"
            title="Re-generate"
          />
        </StyledNoStyleButton>
      )}
    </StyledComponentsWrapper>
    // <span className="ai-button-wrapper">

    //   <button
    //     className="ai-button"
    //     {...eventListner}
    //     {...props.htmlAttributes}
    //     disabled={loading}
    //   >
    //     {loading ? (
    //       <Loader />
    //     ) : (
    //       <span className="text">{props.label || "AIButton"}</span>
    //     )}
    //   </button>
    //   {!cacheResponse && (
    //     <button
    //       className="no-style-button"
    //       disabled={loading}
    //       onClick={generateResponse}
    //     >
    //       <img
    //         className="ai-button-regenerate-icon"
    //         src={stars}
    //         alt="re-generate"
    //         title="Re-generate"
    //       />
    //     </button>
    //   )}
    // </span>
  );
}
