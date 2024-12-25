import { AIButtonProps } from "@/types/index";
import Loader from "@components/loader/Loader";
import jsonSanitizer from "@/utils/jsonSanitizer";
import processAIButtonProps from "@/utils/processAIButtonProps";
import { DOMAttributes, useEffect, useState } from "react";
import stars from "@public/re-generate.svg";
import { postMethod, urls } from "@/utils/utils";
import createIrcRegisteryUseableUseEffects from "./useEffects.hook";
import { AIResponse } from "@server/types";

interface MyModule {
  default: (event: MouseEvent, ...args: unknown[]) => unknown;
  meta?: any;
}

export default function AIButton({ cacheResponse = true }: AIButtonProps) {
  const props = arguments[0];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(undefined);
  const [event, setEvent] = useState<undefined | MyModule>(undefined);
  const [responseMeta, setResponseMeta] = useState<
    undefined | MyModule["meta"]
  >(event?.meta);
  const args = processAIButtonProps(props);
  const eventListner: DOMAttributes<HTMLButtonElement> = {
    [props?.listner || "onClick"]: event
      ? (e: MouseEvent) => event.default(e, args ? args : undefined)
      : undefined,
  };
  error;
  responseMeta;
  useEffect(() => {
    const getEvent = async () => {
      try {
        setLoading(true);
        const event = await import(
          // `../../../../nextjs-genkit/dynamic/${props.filename}.js`
          `../../../dynamic/${props.filename}.js`
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
      {/* <button className="ai-button">
        {loading ? (
          <Loader />
        ) : (
          <span className="button-content">{props.label || "AIButton"}</span>
        )}
      </button> */}

      <button
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
      </button>

      {/* <button
        className="btn"
        {...eventListner}
        {...props.htmlAttributes}
        disabled={loading}
      >
        <svg
          height="24"
          width="24"
          fill="#FFFFFF"
          viewBox="0 0 24 24"
          data-name="Layer 1"
          id="Layer_1"
          className="sparkle"
        >
          <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
        </svg>

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
