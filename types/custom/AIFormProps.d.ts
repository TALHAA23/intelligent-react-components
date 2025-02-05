import React from "react"
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

interface AIFormProps extends Common<React.FormHTMLAttributes<HTMLFormElement>> {
    children:React.ReactNode,

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
         * Number of steps in the form.
         */
        steps?: number;

        /**
         * An array of step descriptions. 
         * Each step description should be a string that describes the fields or content of that step.
         */
        stepDescriptions?: {title:string,fields:string[]}[]
    };
}

export type { AIFormProps }