import { AIFormProps, EnhancedComponentProps } from "@types";
import React from "react";
import enhanceWithAI from "../enhanceWithAI";
const AIForm: React.FC<AIFormProps> = enhanceWithAI((props: AIFormProps) => {
  const p = props as EnhancedComponentProps<AIFormProps, HTMLFormElement>;
  console.log(p);
  return (
    <form ref={p.targetRef} className={props.filename}>
      {props.children}
    </form>
  );
}, "form");

export default AIForm;
