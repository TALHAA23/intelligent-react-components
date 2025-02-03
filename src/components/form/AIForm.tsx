import { AIFormProps, EnhancedComponentProps } from "@types";
import React from "react";
import enhanceWithAI from "../enhanceWithAI";
const AIForm: React.FC<AIFormProps> = enhanceWithAI((props: AIFormProps) => {
  const { prompt } = props as EnhancedComponentProps<
    AIFormProps,
    HTMLFormElement
  >;
  prompt;

  return <form>{props.children}</form>;
}, "form");

export default AIForm;
