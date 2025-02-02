import { AIButtonProps, AIInputProps, Common } from "@/types";

function jsonSanitizer(props: AIButtonProps | AIInputProps) {
  const sanitizedButtonProps = { ...props }; // Create a copy
  // Focus on modifying the callbacks field
  if (sanitizedButtonProps.callbacks) {
    sanitizedButtonProps.callbacks = sanitizeCallbacks(
      sanitizedButtonProps.callbacks
    );
  }
  if (sanitizedButtonProps.mutation) {
    sanitizedButtonProps.mutation = sanitizeMutations(
      sanitizedButtonProps.mutation
    );
  }

  return JSON.stringify(sanitizedButtonProps); // Convert to JSON string
}

function sanitizeCallbacks(
  callbacks: Common["callbacks"]
): Common["callbacks"] {
  const sanitizedCallbacks = { ...callbacks }; // Create a copy of callbacks

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
function sanitizeMutations(mutation: Common["mutation"]): Common["mutation"] {
  if (!mutation) return;
  const sanitizedMutations = [...mutation];
  sanitizedMutations?.map((mutation) => {
    mutation.mutate = mutation.id;
  });
  return sanitizedMutations;
}

export default jsonSanitizer;
