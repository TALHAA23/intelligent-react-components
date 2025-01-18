import { HTMLInputTypeAttribute } from "react";
import { Common } from "./common";

interface AIInputProps extends Common<HTMLInputElement> {
  type: HTMLInputTypeAttribute;
}

export type { AIInputProps };
