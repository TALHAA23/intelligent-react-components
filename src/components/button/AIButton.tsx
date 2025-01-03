import React from "react";
import { AIButtonProps } from "@/types/index";
import Loader from "@components/loader/Loader";
import jsonSanitizer from "@/utils/jsonSanitizer";
import processAIButtonProps from "@/utils/processAIButtonProps";
import stars from "@public/re-generate.svg";
import { postMethod, urls } from "@/utils/utils";
import createIrcRegisteryUseableUseEffects from "./useEffects.hook";
import { AIResponse } from "@server/types";
import {
  StyledAIButtonWrapper,
  StyledAIButton,
  StyledRegenerateIcon,
} from "@styles/StylesAIButton";
import { StyledNoStyleButton } from "@styles/StylesCommon";
interface MyModule {
  default: (event: MouseEvent, ...args: unknown[]) => unknown;
  meta?: any;
}

export default function AIButton({ cacheResponse = true }: AIButtonProps) {
  const props = arguments[0];
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
  error;
  responseMeta;
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
        await generateResponse();
      } finally {
        setLoading(false);
      }
    };
    getEvent();
  }, []);

  const generateResponse = async () => {
    setLoading(true);
    try {
      const response = await fetch(urls.generativeAi, {
        ...postMethod,
        body: jsonSanitizer(props),
      });
      if (!response.ok) throw new Error(await response.text());
      const data = (await response.json()) as AIResponse;
      if (data.error) setError(data.error);
    } catch (err) {
      console.log(err);
      setError({ err: err });
    } finally {
      setLoading(false);
    }
  };

  createIrcRegisteryUseableUseEffects({
    props,
    loading,
    event,
    refreshResponse: generateResponse,
    error,
    responseMeta,
  });
  // ! Attention required: The Button is Styled hardcoded and users might not be able to change its styles
  return (
    <StyledAIButtonWrapper>
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
        <StyledNoStyleButton disabled={loading} onClick={generateResponse}>
          <StyledRegenerateIcon
            src={stars}
            alt="re-generate"
            title="Re-generate"
          />
        </StyledNoStyleButton>
      )}
    </StyledAIButtonWrapper>
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
