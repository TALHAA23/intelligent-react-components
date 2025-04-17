// const stringToFunctionDefination = (funcAsString: undefined | string) => {
//   if (!funcAsString) return false;
//   console.log(funcAsString);
//   const wrapperAnonyousFunction = new Function(`return ${funcAsString}`);
//   const generatedFunction = wrapperAnonyousFunction();
//   return generatedFunction;
// };

function stringToFunctionDefination(fnStr: undefined | string) {
  console.log("Main: ", fnStr);
  if (!fnStr) return false;
  // Remove leading/trailing whitespace
  fnStr = fnStr.trim();

  // Detect if it's an async function
  // const isAsync = fnStr.startsWith("async function");

  // Regex to capture function details
  const functionRegex = /(?:(async)\s*)?function\s*(\w*)\s*\((.*?)\)\s*{/;
  const match = fnStr.match(functionRegex);

  if (!match) {
    throw new Error("Invalid function string");
  }

  // Destructure match results
  const [, asyncKeyword, functionName, functionParams] = match;

  // Find the function body
  const bodyStart = fnStr.indexOf("{");
  const bodyEnd = fnStr.lastIndexOf("}");
  const functionBody = fnStr.slice(bodyStart + 1, bodyEnd).trim();

  // Construct the function based on whether it's async or not
  if (asyncKeyword) {
    return new Function(
      functionParams,
      `return async function ${functionName}(${functionParams}) { ${functionBody} }`
    )();
  }

  // For regular functions
  return new Function(
    functionParams,
    `return function ${functionName}(${functionParams}) { ${functionBody} }`
  )();
}

export default stringToFunctionDefination;

// ? == ** More Robust Version ** ==
// function generateFunction(fnStr) {
//   // Trim and remove any potential BOM or whitespace
//   fnStr = fnStr.trim().replace(/^\uFEFF/, "");

//   // Validate input
//   if (typeof fnStr !== "string") {
//     throw new TypeError("Input must be a string representing a function");
//   }

//   // Check for minimum function structure
//   if (!fnStr.includes("{") || !fnStr.includes("}")) {
//     throw new Error("Invalid function string: missing function body");
//   }

//   // Comprehensive regex to capture function variations
//   const functionRegex =
//     /(?:(?:(async)\s*)?(?:export\s*(?:default\s*)?)?function\s*(\w*)\s*\((.*?)\)\s*{)/;
//   const match = fnStr.match(functionRegex);

//   if (!match) {
//     throw new Error("Unable to parse function string: Invalid function syntax");
//   }

//   // Destructure match results
//   const [, asyncKeyword, functionName, functionParams] = match;

//   // Find the function body with more robust parsing
//   const bodyStart = fnStr.indexOf("{");
//   const bodyEnd = fnStr.lastIndexOf("}");

//   // Validate body extraction
//   if (bodyStart === -1 || bodyEnd === -1 || bodyStart >= bodyEnd) {
//     throw new Error("Unable to extract function body");
//   }

//   const functionBody = fnStr.slice(bodyStart + 1, bodyEnd).trim();

//   // Additional security checks
//   const forbiddenKeywords = ["eval", "Function", "constructor"];
//   if (forbiddenKeywords.some((keyword) => functionBody.includes(keyword))) {
//     throw new Error("Potential security risk: Forbidden keywords detected");
//   }

//   // Limit function body size (optional, adjust as needed)
//   const MAX_FUNCTION_BODY_LENGTH = 10000; // 10,000 characters
//   if (functionBody.length > MAX_FUNCTION_BODY_LENGTH) {
//     throw new Error(
//       `Function body exceeds maximum allowed length of ${MAX_FUNCTION_BODY_LENGTH} characters`
//     );
//   }

//   // Sanitize function params to remove any potential injection attempts
//   const sanitizedParams = functionParams
//     .split(",")
//     .map((param) => param.trim().replace(/[^a-zA-Z0-9_$]/g, ""))
//     .join(",");

//   // Construct the function
//   try {
//     if (asyncKeyword) {
//       return new Function(
//         sanitizedParams,
//         `return async function ${functionName || ""}(${sanitizedParams}) { ${functionBody} }`
//       )();
//     }

//     // For regular functions
//     return new Function(
//       sanitizedParams,
//       `return function ${functionName || ""}(${sanitizedParams}) { ${functionBody} }`
//     )();
//   } catch (error) {
//     throw new Error(`Failed to generate function: ${error.message}`);
//   }
// }
