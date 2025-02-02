import React from "react";
import stars from "@public/re-generate.svg";
import { StyledRegenerateIcon } from "@styles/StylesAIButton";
import {
  StyledComponentsWrapper,
  StyledNoStyleButton,
} from "@styles/StylesCommon";
import { AIInputProps } from "@types";
import extractInfoFromProps from "@utils/extractInfoFromProps[deprecated]";
import Loader from "../loader/Loader";
import generateResponse from "@utils/generateResponse[deprecated]";
import componentRegistrar from "@src/hooks/ircRegistrar";

interface MyModule {
  default: (
    event: React.ChangeEvent<HTMLInputElement>,
    ...args: unknown[]
  ) => unknown;
  meta?: any;
  onInitialRender: (event: HTMLInputElement, ...args: unknown[]) => void;
}

export default function AIInput(props: AIInputProps) {
  const isOnInitCallback = React.useMemo(() => typeof props.onInit === "function", [props.onInit]);
  const targetRef = React.useRef<HTMLInputElement>(null);
  const [onInitialRender, setOnInitialRender] = React.useState<undefined | string | ((event: HTMLInputElement, ...args: unknown[]) => void)>(isOnInitCallback ? () => props.onInit : undefined);
  const [error, setError] = React.useState<any>(undefined);
  const [loading, setLoading] = React.useState(true);
  const [event, setEvent] = React.useState<undefined | MyModule>(undefined);
  const [responseMeta, setResponseMeta] = React.useState<undefined | MyModule["meta"]>(undefined);
  const args = React.useMemo(() => extractInfoFromProps(props), [props]);

  const eventListener: React.DOMAttributes<HTMLInputElement> = React.useMemo(() => ({
    [props?.listener || "onChange"]: event
      ? (e: React.ChangeEvent<HTMLInputElement>) => event.default(e, args)
      : undefined,
  }), [event, args, props?.listener]);

  React.useEffect(() => {
    const getEvent = async () => {
      try {
        setLoading(true);
        const event = await import(`/dynamic/${props.filename}.js`);
        setEvent(event);
        setResponseMeta(event.meta);
        if (props.onInit && !isOnInitCallback && event.onInitialRender) {
          setOnInitialRender(() => event.onInitialRender);
        }
      } catch (err) {
        console.error(err);
        await generateResponse(setLoading, setError, {
          ...props,
          element: "input",
        });
      } finally {
        setLoading(false);
      }
    };
    getEvent();
  }, [props.filename]);

  React.useEffect(() => {
    if (typeof onInitialRender === "function" && targetRef.current) {
      onInitialRender(targetRef.current, args);
    }
  }, [onInitialRender, event]);


  componentRegistrar({
    props,
    loading,
    event,
    error,
    responseMeta,
    refreshResponse: () => generateResponse(setLoading, setError, props),
  })
  return (
    <StyledComponentsWrapper>
      <span>
        <input
          ref={targetRef}
          type={props.type || "text"}
          {...eventListener}
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
              generateResponse(setLoading, setError, {
                ...props,
                element: "input",
              })
            }
          />
        </StyledNoStyleButton>
      )}
    </StyledComponentsWrapper>
  );
}
