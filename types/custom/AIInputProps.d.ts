import React from "react";
import { Common } from "./common";

interface AIInputProps extends Common<React.InputHTMLAttributes<HTMLInputElement>> {
  /**
   * The type of the input (e.g., "text", "password", "radio").
   */
  type: React.HTMLInputTypeAttribute;
}

export type { AIInputProps };
