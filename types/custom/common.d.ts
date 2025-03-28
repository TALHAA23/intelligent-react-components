import React from "react";

// type Element = "input" | "button" | "form";

interface Common<Target = React.HTMLAttributes> {
  /**
   * Any valid event handler .i.e onClick, onHover etc.
   *
   * @type {?React.DOMAttributes<HTMLElement>}
   */
  on?: React.DOMAttributes<HTMLElement>;
  /**
   * Indicates whether to cache the response from the AI.
   * If set to `false`, it creates a button beside the element which, when clicked, sends another request to generate code (a refresh button).
   * The default value is `true`.
   */
  cacheResponse?: boolean;

  /**
   * The prompt to be sent to the AI.
   * This string provides instructions to the AI on how to generate the desired code.
   */
  prompt: string;

  /**
   * Name for the file to be created (without extension).
   * This filename is used to dynamically import the AI logic.
   * It should be unique and descriptive.
   */
  filename: string;

  /**
   * The name of the event listener to attach to the element (e.g., "onChange", "onBlur", "onClick").
   */
  listener: keyof React.DOMAttributes<React.ReactHTMLElement>;

  // /**
  //  * The type of the element.
  //  * Valid values are "input" or "button".
  //  * It is automatically added so you can omit this.
  //  */
  // element?: Element;

  /**
   * Specific HTML attributes for the element .i.e className, id etc
   */
  attributes?: Target;

  /**
   * Supporting properties for the AI module.
   * These properties provide additional context and information for the AI.
   */
  supportingProps?: {
    /**
     * Key-value pairs where the key is a placeholder in the prompt prefixed with '$',
     * and the value is its actual meaning.
     * Example: `{ $API: "https://localhost:3000" }` if the prompt uses `$API`.
     */
    utils?: {
      [key: string]: any;
    };

    /**
     * Used when the prompt describes some database-related information.
     * - `name`: The name of the operation (e.g., "firebase", "firebase authentication").
     * - `envGuide`: A hint or guide on how the generated code will access secrets
     *              (e.g., connection details, environment variables).
     */
    database?: {
      name: string;
      envGuide?: string;
    };

    /**
     * Used to store context from the user codebase.
     * Variables in the prompt should be prefixed with "_" to indicate they refer to these variables.
     * Example: `{ list: [] }` if the generated code needs a `list` variable.
     */
    variables?: {
      [key: string]: any;
    };
  };

  /**
   * An array of mutation objects that the generated code should perform,
   * such as updating a state value or reassigning a variable.
   */
  mutation?: {
    /**
     * A unique ID for the mutation.
     */
    id: string;

    /**
     * The format in which the mutation should be done.
     * For example, if updating a state, the desired structure of the new state value.
     */
    returnFormat: any;

    /**
     * The mutation function or value.
     * For state updates, pass the `setState` function.
     * For variable assignment, pass the variable reference.
     */
    mutate: any;

    /**
     * The type of mutation:
     * - `"callback"`: `mutation[].mutate` is called as a function.
     * - `"assignment"`: `mutation[].mutate` is assigned using `=`.
     */
    mutationType?: "callback" | "assignment";
  }[];

  /**
   * An object containing callback functions that the generated code should call
   * when certain conditions are met.
   */
  callbacks?: {
    /**
     * An array of independent callback objects (functions that take no arguments).
     */
    independent?: {
      /**
       * A guide for when to call the callback.
       */
      callGuide: string;

      /**
       * The independent callback function.
       */
      callback: Function;
    }[];

    /**
     * An array of dependent callback objects (functions that require data from the generated code).
     */
    dependent?: {
      /**
       * A guide for when to call the callback.
       */
      callGuide: string;

      /**
       * An array of guides for the parameters to pass to the callback.
       * Each index corresponds to a parameter.
       */
      parametersGuide: string[];

      /**
       * The dependent callback function.
       */
      callback: Function;
    }[];

    [key: string]: any;
  };
  /**
   * A function or a prompt string to be executed after the input is initialized. 
   * 
   * **If it's a function:** 
     - It will be called with the initialized element (`target`) as the first argument.
     - You can use this function to perform actions on the input element 
       (e.g., focus the input, apply initial styling).
   * 
   * **If it's a string:** 
     - It will be treated as a prompt for the AI to generate a function that will be executed on the first render. 
     - The generated function will receive the target element as its first argument.
   */
  onInit?: ((target: Target, ...args: any[]) => void) | string;

  /** Provide feedback of the previous response, what goes wrong, what need to be change for the model to
   * use it and generate new code with the changes.
   */
  feedback?: string;
}

export type { Common };
