import { Request, Response } from "express";
type RouteHandler = (req: Request, res: Response) => void;
type Listner =
  | "click"
  | "mousedown"
  | "mouseup"
  | "mouseover"
  | "mousemove"
  | "mouseLeave"
  | "mouseEnter"
  | "focus"
  | "blur"
  | "change"
  | "submit"
  | "scroll";

interface AIButtonProps {
  prompt: string;
  filename: string;
  label?: string;
  listner: Listner;
  supportingProps?: {
    utils?: {
      [key: string]: string;
    };
    parameters?: any[];
  };
  mutation?: {
    id: any;
    returnFormat: any;
    mutate: any;
    mutationType: "callback" | "assignment";
  }[];

  callbacks?: {
    independent?: { useGuide: string; callback: Function[] }[];
    dependent?: {
      callGuide: string;
      parametersGuide: string[];
      callback: Function;
    };
  };
  globals: {
    [key: string]: any;
  };
}

interface AIResponse {
  thoughts?: string;
  response?: {
    eventListener: string;
    globals?: {
      [key: string]: any;
    };
    imports?: string[];
    helperFunctions?:Function[]
  };
  error: {
    message: string;
    status: number;
    details: string;
    code:string
  };
  
  expect?: string;
}

export type { RouteHandler, AIButtonProps, AIResponse };
