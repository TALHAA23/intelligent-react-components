import React from "react";
import { Common } from "./common";

interface FormField {
  /**
   * Unique identifier for the field.
   * Used for referencing the field in other parts of the form definition
   * (e.g., conditional logic, validation rules).
   * Refer to a field with a prefix @ followed by the id
   * (e.g, fieldDefination: Value should be same as @SomeOtherField)
   */
  id?: string;

  /**
   * The type of input .i.e text, email, password etc.
   */
  type:
    | React.HTMLInputTypeAttribute
    | "radio-group" // Represents a group of radio buttons
    | "drop-down" // Represents a <select> element
    | "textarea" // Represents a <textarea> element (though <input type="textarea"> doesn't exist)
    | "checkbox-group"; // Represents a group of checkboxes

  /**
   * A concise description of the desired field.
   * This prompt will be used by the AI to generate the field's properties.
   */
  fieldDefination: string;

  /**
   * Hints for the desired visual style of the field.
   * Examples: "outlined", "filled", "compact"
   */
  styleHint?: string;

  /**
   * Hints for the desired layout of the field within the form.
   * Examples: "full-width", "half-width", "grid-column"
   */
  layout?: string;

  /**
   * Guidelines for field validation.
   * Examples:
   *   "Required",
   *   "Must be a valid email address",
   *   "Must be a number between 1 and 100",
   *   "Must match the password field"
   */
  validate?: string;
}

interface AIFormProps
  extends Common<React.FormHTMLAttributes<HTMLFormElement>> {
  children?: React.ReactNode;

  /**
   * Hints for the desired form layout.
   * Examples: "one-column", "two-column", "grid", "horizontal"
   */
  layout?: string;

  /**
   * Guidelines for the visual style of the form.
   * Examples: "Material Design", "Bootstrap", "company branding guidelines"
   */
  styleHint?: string;

  /**
   * Guide on how to or what validation should be done for the form.
   */
  validate?: string;

  /**
   * An array of field definitions. This can be used in conjunction with or as an
   * alternative to the `prompt`.
   */
  fieldDefinitions?: FormField[];

  /**
   * An object containing event handlers for form events.
   */
  formEvents?: {
    onSubmit?: (data: any) => void;
    onError?: (error: any) => void;
    onLoading?: (isLoading: boolean) => void;
  };

  multiStep?: {
    /**
     * Common things that each of the stage should have. (optional)
     */
    common?: string;
    /**
     * An array of step descriptions.
     * Each step should have a title and field, optionally define layout, styleHint (if different for each)
     * and validation rules. Additionally you can use optional desc field to add even more explaination
     * of what you want.
     */
    steps: {
      /**
       * Title of the stage
       */
      title: string;
      /**
       * Field that goes into this stage of form.
       * It is suggested to use fieldDefinitions each with id property to refer them here
       * Alternatively use self-explaining name to avoid assumatiion by the model
       */
      fields: string[];
      /**
       * Describe the stage, add details of what the stage is contributing (optional)
       */
      desc?: string;
      /**
       * Hints for the desired form layout.
       */
      layout?: string;

      /**
       * Guidelines for the visual style of the stage.
       */
      styleHint?: string;

      /**
       * Guide on how to or what validation should be done for the stage.
       */
      validate?: string;
    }[];
  };
}

export type { AIFormProps };
