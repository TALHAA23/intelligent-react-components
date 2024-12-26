import React from "react";
import { AIButtonProps } from "@/types/index";
import Loader from "@components/loader/Loader";
import jsonSanitizer from "@/utils/jsonSanitizer";
import processAIButtonProps from "@/utils/processAIButtonProps";
import stars from "@public/re-generate.svg";
import { postMethod, urls } from "@/utils/utils";
import createIrcRegisteryUseableUseEffects from "./useEffects.hook";
import { AIResponse } from "@server/types";
import styled from "styled-components";
interface MyModule {
  default: (event: MouseEvent, ...args: unknown[]) => unknown;
  meta?: any;
}

const Button = styled.button`
  display: inline-block;
  color: #bf4f74;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;
  display: block;
`;
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

  return (
    <span className="ai-button-wrapper">
      <Button {...eventListner} {...props.htmlAttributes} disabled={loading}>
        {loading ? (
          <Loader />
        ) : (
          <span className="text">{props.label || "AIButton"}</span>
        )}
      </Button>
      {/* <button
        className="ai-button"
        {...eventListner}
        {...props.htmlAttributes}
        disabled={loading}
      >
        {loading ? (
          <Loader />
        ) : (
          <span className="text">{props.label || "AIButton"}</span>
        )}
      </button> */}
      {!cacheResponse && (
        <button
          className="no-style-button"
          disabled={loading}
          onClick={generateResponse}
        >
          <img
            className="ai-button-regenerate-icon"
            src={stars}
            alt="re-generate"
            title="Re-generate"
          />
        </button>
      )}
    </span>
  );
}
