import { DOMAttributes, HTMLAttributes } from "react";
import { Request, Response } from "express";
type RouteHandler = (req: Request, res: Response) => void;
type Element = "input" | "button";

interface Common<T = Function> {
  cacheResponse?: boolean;
  prompt: string;
  filename: string;
  listner: keyof DOMAttributes<HTMLElement>;
  element?: Element;
  htmlAttributes?: HTMLAttributes<HTMLElement>;
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

interface AIResponse {
  thoughts?: string;
  response?: {
    eventListener: string;
    globals?: {
      [key: string]: any;
    };
    imports?: string[];
    helperFunctions?: Function[];
    onInitialRender?: string
  };
  error: {
    message: string;
    status: number;
    details: string;
    code: string;
  };

  expect?: string;
}

export type { RouteHandler, Common, AIResponse };
