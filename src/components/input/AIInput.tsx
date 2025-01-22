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
import generateResponse from "@utils/generateResponse";

interface MyModule {
  default: (
    event: React.ChangeEvent<HTMLInputElement>,
    ...args: unknown[]
  ) => unknown;
  meta?: any;
}

export default function AIInput(props: AIInputProps) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<any>(undefined);
  const [event, setEvent] = React.useState<undefined | MyModule>(undefined);
  const [responseMeta, setResponseMeta] = React.useState<
    undefined | MyModule["meta"]
  >(event?.meta);
  const args = extractInfoFromProps(props);
  const eventListner: React.DOMAttributes<HTMLInputElement> = {
    [props?.listner || "onChange"]: event
      ? (e: React.ChangeEvent<HTMLInputElement>) =>
          event.default(e, args ? args : undefined)
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
        await generateResponse(setLoading, setError, {
          ...props,
          element: "input",
        });
      } finally {
        setLoading(false);
      }
    };
    getEvent();
  }, []);

  error;
  responseMeta;
  return (
    <StyledComponentsWrapper>
      <input
        type={props.type || "text"}
        {...eventListner}
        {...props.htmlAttributes}
        {...props.attributes}
        disabled={loading}
      />
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
