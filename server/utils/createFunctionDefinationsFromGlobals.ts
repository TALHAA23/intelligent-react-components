import { AIResponse } from "../types";

export default function createFunctionDefinationFromGlobals(response: (AIResponse)["response"]):Function[] {
    if(!response?.helperFunctions?.length) return [];
    const {helperFunctions} = response;
    const extractedFunctions:Function[] = []
    helperFunctions.map(fn=>{
      const wrapperAnonyousFunction = new Function(`return ${fn}`);
      const generatedFunction = wrapperAnonyousFunction();
      extractedFunctions.push(generatedFunction);
    })
    // const objectToEntries = Object.entries(globals);
    // const isStartingWithFn = new RegExp(/^fn/);
    // objectToEntries.forEach(([key, value]) => {
    //   if (!isStartingWithFn.test(key)) return;
    //   const wrapperAnonyousFunction = new Function(`return ${value}`);
    //   const generatedFunction = wrapperAnonyousFunction();
    //   extractedFunctions.push(generatedFunction);
    //   // globals[key] = generatedFunction;
    //   delete globals[key];
    // });
    return extractedFunctions
}