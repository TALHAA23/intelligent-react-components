import { AIResponse, Common } from '@types';
import extractInfoFromProps from '@utils/extractInfoFromProps';
import { postMethod, urls } from '@utils/utils';
import React, { useEffect, useState, useRef } from 'react';



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
      console.log(err);
      setState((prevState) => ({ ...prevState, error: { err: err } })); 
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }

  function jsonSanitizer(props: Common) {
    const sanitizedProps = { ...props }; // Create a copy
  
    // Handle element-specific properties (if needed)
    if (props.element === 'input' && props.type) {
      sanitizedProps.type = props.type; // Include type for input elements
    }
  
    // Focus on modifying the callbacks field
    if (sanitizedProps.callbacks) {
      sanitizedProps.callbacks = sanitizeCallbacks(sanitizedProps.callbacks);
    }
    if (sanitizedProps.mutation) {
      sanitizedProps.mutation = sanitizeMutations(sanitizedProps.mutation);
    }
  
    return JSON.stringify(sanitizedProps); // Convert to JSON string
  }
  
  function sanitizeCallbacks(callbacks: Common["callbacks"]) {
    const sanitizedCallbacks: Common["callbacks"] = { ...callbacks }; // Create a copy of callbacks
  
    // Iterate over both independent and dependent arrays
    for (const key of ["independent", "dependent"]) {
      if (callbacks?.[key]) {
        sanitizedCallbacks[key] = callbacks[key].map(
          (callbackObject:any, index:number) => {
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

  const withAIEvents = <T extends Common>(
    WrappedComponent: React.FC<T> 
  ): React.FC<T> => {
  const WithAIEventsComponent = (props: T) => {
    const isOnInitCallback = React.useMemo(() => typeof props.onInit === "function", [props.onInit]);
    const targetRef = useRef<HTMLElement>(null);
    const [onInitialRender, setOnInitialRender] = useState<undefined | string | ((event: HTMLElement, ...args: unknown[]) => void)>(isOnInitCallback ? () => props.onInit : undefined);
    const args = React.useMemo(() => extractInfoFromProps(props), [props]);
    const [state, setState] = useState<BaseComponentState>({
      loading: true,
      error: undefined,
      event: undefined,
      responseMeta: undefined,
    });

    const handleEvent = (e: any, args: any) => {
      if (state.event && state.event.default) {
        state.event.default(e, args);
      }
    };

    useEffect(() => {
      const getEvent = async () => {
        try {
          const event = await import(`/dynamic/${props.filename}.js`);
          setState((prev) => ({ ...prev, event, responseMeta: event.meta }));
          if (props.onInit && !isOnInitCallback && event.onInitialRender) {
            setOnInitialRender(() => event.onInitialRender);
          }
        } catch (err) {
          console.error(err);
          await generateResponse(setState, { ...props, element: "component" }); // Handle error generically
          
        } finally {
          setState((prev) => ({ ...prev, loading: false }));
        }
      };
      getEvent();
    }, [props.filename]);

    useEffect(() => {
      if (typeof onInitialRender === "function" && targetRef.current) {
        onInitialRender(targetRef.current, args); // Pass args to onInitialRender
      }
    }, [onInitialRender]);

    // ! You can add componentRegistrar logic here if needed

    return (
      <WrappedComponent
        {...props}
        {...state}
        handleEvent={handleEvent}
        targetRef={targetRef}
        refreshResponse={() => generateResponse(setState, props)} 
      />
    );
  };

  WithAIEventsComponent.displayName = `WithAIEvents(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAIEventsComponent;
};

export default withAIEvents;