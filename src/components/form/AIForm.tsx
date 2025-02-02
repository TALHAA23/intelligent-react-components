import { AIFormProps } from "@types"
import React from "react"
import enhanceWithAI from "../enhanceWithAI"
const AIForm: React.FC<AIFormProps> = enhanceWithAI((props: AIFormProps) => {
    const { prompt } = props;
    prompt
    return <form >
        {

        }
    </form>

}, "form")


export default AIForm