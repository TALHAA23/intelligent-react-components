import React from "react";
import stars from "@public/re-generate.svg";
import { StyledRegenerateIcon } from "@styles/StylesAIButton";
import {
  StyledComponentsWrapper,
  StyledNoStyleButton,
} from "@styles/StylesCommon";
import { AIInputProps } from "@types";
import extractInfoFromProps from "@utils/extractInfoFromProps";
import Loader from "../loader/Loader";
// import { postMethod, urls } from "@utils/utils";
// import jsonSanitizer from "@utils/jsonSanitizer";
import generateResponse from "@utils/generateResponse";

interface MyModule {
  default: (event: MouseEvent, ...args: unknown[]) => unknown;
  meta?: any;
}

export default function AIInput({ cacheResponse = false }: AIInputProps) {
  const props = arguments[0];
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<any>(undefined);
  const [event, setEvent] = React.useState<undefined | MyModule>(undefined);
  const [responseMeta, setResponseMeta] = React.useState<
    undefined | MyModule["meta"]
  >(event?.meta);
  const args = extractInfoFromProps(props);
  const eventListner: React.DOMAttributes<HTMLButtonElement> = {
    [props?.listner || "onClick"]: event
      ? (e: MouseEvent) => event.default(e, args ? args : undefined)
      : undefined,
  };

  React.useEffect(() => {
    const getEvent = async () => {
      try {
        setLoading(true);
        const event = await import(`/dynamic/${props.filename}.js`);
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

  // const generateResponse = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(urls.generativeAi, {
  //       ...postMethod,
  //       body: jsonSanitizer(props),
  //     });
  //     if (!response.ok) throw new Error(await response.text());
  //     const data = (await response.json()) as AIResponse;
  //     if (data.error) setError(data.error);
  //   } catch (err) {
  //     console.log(err);
  //     setError({ err: err });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  setLoading;
  setError;
  setEvent;
  setResponseMeta;
  error;
  responseMeta;
  return (
    <StyledComponentsWrapper>
      <input
        type="text"
        {...eventListner}
        {...props.htmlAttributes}
        disabled={loading}
      />
      {loading && <Loader />}
      {!cacheResponse && (
        <StyledNoStyleButton disabled={loading}>
          <StyledRegenerateIcon
            src={stars}
            alt="re-generate"
            title="Re-generate"
          />
        </StyledNoStyleButton>
      )}
    </StyledComponentsWrapper>
  );
}
