import { AIButtonProps, AIInputProps } from "@types";
import jsonSanitizer from "./jsonSanitizer";
import { postMethod, urls } from "./utils";
import React from "react";
import { AIResponse } from "@server/types";
export default async function generateResponse(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<
    React.SetStateAction<{ err: any } | AIResponse["error"]>
  >,
  props: AIButtonProps | AIInputProps
) {
  setLoading(true);
  try {
    const response = await fetch(urls.generativeAi, {
      ...postMethod,
      body: jsonSanitizer(props),
    });
    if (!response.ok) throw new Error(await response.text());
    const data = (await response.json()) as AIResponse;
    if (data.error) setError(data.error);
  } catch (err) {
    console.log(err);
    setError({ err: err });
  } finally {
    setLoading(false);
  }
}
