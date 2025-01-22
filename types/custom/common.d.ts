import React from "react";

type Element = "input" | "button";

interface Common<T = Function> {
  cacheResponse?: boolean = false;
  prompt: string;
  filename: string;
  listner: keyof React.DOMAttributes<React.ReactHTMLElement>;
  element?: Element;
  htmlAttributes?: React.HTMLAttributes<React.ReactHTMLElement>
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
  [key: string]: any;
}

export type { Common };
