import React from "react";
import { Common } from "./common";
interface AIButtonProps
  extends Common<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  /**
   * The inner text inside a button
   */
  label?: string;
}

export type { AIButtonProps };
