import { AIResponse } from "../types";
import stringToFunctionDefination from "./stringToFunctionDefination.js";

export default function createFunctionDefinationFromGlobals(
  response: AIResponse["response"]
): Function[] {
  if (!response?.helperFunctions?.length) return [];
  const { helperFunctions } = response;
  const extractedFunctions: Function[] = [];
  helperFunctions.map((fn) => {
    const generatedFunction = stringToFunctionDefination(fn);
    // const wrapperAnonyousFunction = new Function(`return ${fn}`);
    // const generatedFunction = wrapperAnonyousFunction();
    extractedFunctions.push(generatedFunction);
  });
  return extractedFunctions;
}
