import { DOMAttributes, HTMLAttributes } from "react";

type Element = "input" | "button";

interface Common<Others = undefined, T = Function> {
  cacheResponse?: boolean = false;
  prompt: string;
  filename: string;
  listner: keyof DOMAttributes<HTMLElement>;
  element?: Element;
  htmlAttributes?: HTMLAttributes<Others>;
  supportingProps?: {
    utils?: {
      [key: string]: any;
    };
    database?: {
      name: string;
      envGuide: string;
    };
    parameters?: any[];
    variables?: {
      [key: string]: any;
    };
  };
  mutation?: {
    id: string;
    returnFormat: any;
    mutate: any;
    mutationType?: "callback" | "assignment";
  }[];
  callbacks?: {
    independent?: { callGuide: string; callback: T }[];
    dependent?: {
      callGuide: string;
      parametersGuide: string[];
      callback: T;
    }[];
    [key: string]: any;
  };
  others?: Partial<Others>;
  [key: string]: any;
}

export type { Common };
