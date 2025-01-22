import React, { HTMLInputTypeAttribute } from "react";
import { Common } from "./common";

interface AIInputProps extends Common {
  type: HTMLInputTypeAttribute;
  attributes?: React.InputHTMLAttributes<HTMLInputElement>;
}

export type { AIInputProps };
