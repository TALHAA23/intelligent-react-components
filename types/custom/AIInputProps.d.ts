import React from "react";
import { Common } from "./common";

interface AIInputProps extends Common<HTMLInputElement> {
  type: React.HTMLInputTypeAttribute;
  attributes?: React.InputHTMLAttributes<HTMLInputElement>;
}

export type { AIInputProps };
