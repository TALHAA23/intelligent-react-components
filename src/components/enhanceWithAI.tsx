import { AIFormProps, AIResponse, Common } from "@types";
import { IRC_ACTIONS, postMethod, urls } from "@utils/utils";
import React from "react";
import { useIrcRegistriesAndRegister } from "../hooks/ircRegisteryProvider";

interface BaseComponentState {
  loading: boolean;
  error?: any;
  event?: any;
  responseMeta?: any;
}

async function generateResponse(
  setState: React.Dispatch<React.SetStateAction<BaseComponentState>>,
  props: Common
) {
  setState((prevState) => ({ ...prevState, loading: true }));

  try {
    const response = await fetch(urls.generativeAi, {
      ...postMethod,
      body: jsonSanitizer(props),
    });

    if (!response.ok) throw new Error(await response.text());
    const data = (await response.json()) as AIResponse;
    if (data.error) {
      setState((prevState) => ({ ...prevState, error: data.error }));
    }
    // Handle successful response, e.g., update state with data
  } catch (err) {
    console.error(err);
    setState((prevState) => ({ ...prevState, error: { err: err } }));
  } finally {
    setState((prevState) => ({ ...prevState, loading: false }));
  }
}

function jsonSanitizer(props: Common) {
  const sanitizedProps = { ...props }; // Create a copy

  // Focus on modifying the callbacks field
  if (sanitizedProps.callbacks) {
    sanitizedProps.callbacks = sanitizeCallbacks(sanitizedProps.callbacks);
  }

  if (sanitizedProps.mutation) {
    sanitizedProps.mutation = sanitizeMutations(sanitizedProps.mutation);
  }

  if (Object.keys(sanitizedProps).includes("children"))
    delete (sanitizedProps as AIFormProps).children;

  return JSON.stringify(sanitizedProps); // Convert to JSON string
}

function sanitizeCallbacks(callbacks: Common["callbacks"]) {
  const sanitizedCallbacks: Common["callbacks"] = { ...callbacks }; // Create a copy of callbacks

  // Iterate over both independent and dependent arrays
  for (const key of ["independent", "dependent"]) {
    if (callbacks?.[key]) {
      sanitizedCallbacks[key] = callbacks[key].map(
        (callbackObject: any, index: number) => {
          // Check if `callback` property is a function
          if (typeof callbackObject.callback === "function") {
            // Check for arrow function (name property resolves to "callback")
            const callbackName = callbackObject.callback.name;
            callbackObject.callback =
              callbackName === "callback"
                ? `callback${key}${index}`
                : callbackObject.callback.name;
          }
          return callbackObject;
        }
      );
    }
  }
  return sanitizedCallbacks;
}

function sanitizeMutations(mutation: Common["mutation"]) {
  if (!mutation) return;
  const sanitizedMutations = [...mutation];
  sanitizedMutations?.map((mutation) => {
    mutation.mutate = mutation.id;
  });
  return sanitizedMutations;
}

interface Result {
  [key: string]: any;
}

function extractInfoFromProps(props: Common): Result {
  const result: Result = { ...props };

  if (props.supportingProps) {
    const { utils = {}, variables = {} } = props.supportingProps;

    Object.keys(utils).forEach((key) => {
      result[`${key}`] = utils[key];
    });
    Object.keys(variables).forEach((key) => {
      result[`${key}`] = variables[key];
    });
  }

  if (props.mutation) {
    props.mutation.forEach((mutation) => {
      result[mutation.id] = mutation.mutate;
    });
  }

  const callbacks = [props.callbacks?.independent, props.callbacks?.dependent];
  callbacks.map((callbackSet) => {
    callbackSet?.map((callback, index) => {
      const callbackName = callback?.callback?.name;
      const key =
        callbackName == "callback"
          ? `callback${index == 0 ? "independent" : "dependent"}${index}`
          : callbackName;
      result[key] = callback.callback;
    });
  });
  return result;
}

const enhanceWithAI = <T extends Common>(
  WrappedComponent: React.FC<T>,
  element: "button" | "input" | "form"
) => {
  const EnhancedComponent = (props: T) => {
    const enhancedProps = { ...props, element };
    const isOnInitCallback = React.useMemo(
      () => typeof props.onInit === "function",
      [props.onInit]
    );
    const targetRef = React.useRef<HTMLElement>(null);
    const [onInitialRender, setOnInitialRender] = React.useState<
      undefined | string | ((event: HTMLElement, ...args: unknown[]) => void)
    >(isOnInitCallback ? () => props.onInit : undefined);
    const [formBuilder, setFormBuilder] = React.useState<undefined | Function>(
      undefined
    );
    const [state, setState] = React.useState<BaseComponentState>({
      loading: true,
      error: undefined,
      event: undefined,
      responseMeta: undefined,
    });
    // TODO: LOGIC TO DELETE
    // const args = React.useMemo(
    //   () => extractInfoFromProps(props),
    //   [props, state]
    // );

    const args = React.useRef<Result | null>(null);

    // Update the ref whenever `args` changes
    React.useEffect(() => {
      args.current = extractInfoFromProps(props);
    }, [props, state]);

    const handleEvent = React.useCallback(
      (e: any) => {
        if (state.event && state.event.default) {
          const currentArgs = args?.current; // Use the latest args from the ref
          state.event.default(e, currentArgs); // Use the latest args
        }
      },
      [state.event, props] // No need to include `args` here
    );
    // TODO: LOGIC TO DELETE
    // const handleEvent = (e: any) => {
    //   if (state.event && state.event.default) {
    //     if (props.filename == "filterTodos") console.log("setting event", args);
    //     state.event.default(e, args); // Use memoized args
    //   }
    // };

    React.useEffect(() => {
      const getEvent = async () => {
        try {
          setState((prev) => ({ ...prev, loading: true }));
          const event = await import(`/dynamic/${props.filename}.js`);
          setState((prev) => ({ ...prev, event, responseMeta: event.meta }));
          if (props.onInit && !isOnInitCallback && event.onInitialRender) {
            setOnInitialRender(() => event.onInitialRender);
          }
          if (event.formBuilder) {
            setFormBuilder(() => event.formBuilder);
          }
        } catch (err) {
          console.error(err);
          await generateResponse(setState, enhancedProps); // Handle error generically
        } finally {
          setState((prev) => ({ ...prev, loading: false }));
        }
      };
      getEvent();
    }, [props.filename]);
    React.useEffect(() => {
      if (formBuilder && targetRef?.current instanceof HTMLFormElement) {
        formBuilder(targetRef?.current, args?.current);
      }
      if (typeof onInitialRender === "function" && targetRef?.current) {
        onInitialRender(targetRef?.current, args?.current);
      }
    }, [onInitialRender, formBuilder]);

    // * Component registration for Devtools

    const ircRegisteryAndRegister = useIrcRegistriesAndRegister(); // Assuming this hook is available

    React.useEffect(() => {
      ircRegisteryAndRegister.register(IRC_ACTIONS?.new, {
        filename: props.filename,
        props, // Now includes the element prop
        refreshResponse: () => generateResponse(setState, enhancedProps),
      });
    }, []);

    React.useEffect(() => {
      ircRegisteryAndRegister.register(IRC_ACTIONS?.updateStatus, {
        filename: props.filename,
        props,
        status: state.loading
          ? "pending"
          : state.event
            ? "successful"
            : "unknown",
        refreshResponse: () => generateResponse(setState, enhancedProps),
      });
    }, [state.loading, state.event]); // Use state.loading and state.event

    React.useEffect(() => {
      ircRegisteryAndRegister.register(IRC_ACTIONS?.updateErrorAndResponse, {
        filename: props.filename,
        props,
        error: state.error, // Use state.error
        response: state.responseMeta, // Use state.responseMeta
        status: state.error
          ? "error"
          : state.responseMeta
            ? "successful"
            : "unknown",
        refreshResponse: () => generateResponse(setState, enhancedProps),
      });
    }, [state.error, state.responseMeta]); // Use state.error and state.responseMeta

    return (
      <WrappedComponent
        {...enhancedProps}
        {...state}
        handleEvent={handleEvent}
        targetRef={targetRef}
        refreshResponse={() => generateResponse(setState, enhancedProps)}
      />
    );
  };

  return EnhancedComponent;
};

export default enhanceWithAI;
