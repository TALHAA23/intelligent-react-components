import React from "react";
import { AIButtonProps } from "@/types/index";
import Loader from "@components/loader/Loader";
import stars from "@public/re-generate.svg";
import { StyledAIButton, StyledRegenerateIcon } from "@styles/StylesAIButton";
import {
  StyledNoStyleButton,
  StyledComponentsWrapper,
} from "@styles/StylesCommon";
import generateResponse from "@utils/generateResponse[deprecated]";
import extractInfoFromProps from "@utils/extractInfoFromProps[deprecated]";
import componentRegistrar from "@src/hooks/ircRegistrar";
interface MyModule {
  default: (event: MouseEvent, ...args: unknown[]) => unknown;
  meta?: any;
}

export default function AIButton(props: AIButtonProps) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<any>(undefined);
  const [event, setEvent] = React.useState<undefined | MyModule>(undefined);
  const [responseMeta, setResponseMeta] = React.useState<
    undefined | MyModule["meta"]
  >(event?.meta);
  const args = extractInfoFromProps({ ...props });
  const eventListner: React.DOMAttributes<HTMLButtonElement> = {
    [props?.listener || "onClick"]: event
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
        await generateResponse(setLoading, setError, {
          ...props,
          // element: "button",
        });
      } finally {
        setLoading(false);
      }
    };
    getEvent();
  }, []);

  componentRegistrar({
    props,
    loading,
    event,
    error,
    responseMeta,
    refreshResponse: () => generateResponse(setLoading, setError, props),
  });
  // ! Attention required: The Button is Styled hardcoded and users might not be able to change its styles
  return (
    <StyledComponentsWrapper>
      <StyledAIButton
        {...eventListner}
        {...props.attributes}
        disabled={loading}
      >
        {loading ? (
          <Loader />
        ) : (
          <span className="text">{props.label || "AIButton"}</span>
        )}
      </StyledAIButton>
      {props.cacheResponse == false && (
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
