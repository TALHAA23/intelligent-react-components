import React from "react";
import { Common } from "./common";
interface AIButtonProps extends Common<HTMLButtonElement> {
  label?: string;
  attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export type { AIButtonProps };
