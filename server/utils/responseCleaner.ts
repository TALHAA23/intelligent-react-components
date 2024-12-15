import { AIResponse } from "../types";

/**
 * a cool function
 * @param {string} response
 * @returns {string}
 * @description
 * clear a response
 */
export default function clearResponse(response: string):AIResponse {
  console.log(response);
  const cleanedResponse = response
  .replaceAll(/```(json|javascript)?/g, "")                  // Remove code block markers
.replaceAll(/[^\x20-\x7E]/g, " ")                          // Remove non-printable characters
.replaceAll(/^\s+|\s+$/g, "")                              // Trim leading and trailing spaces
// .replaceAll(/\\"/g, '"')                                   // Fix escaped double quotes
// .replaceAll(/\\\\/g, '\\')                                 // Fix double backslashes
// .replaceAll(/\n/g, '')                                     // Remove all newlines
// .replaceAll(/,\s*([}\]])/g, '$1')                          // Remove trailing commas
// .replaceAll(/'/g, '"')                                     // Convert single quotes to double quotes
// .replaceAll(/\s*([{}\[\]])\s*/g, '$1')                     // Normalize spacing around braces/brackets
// .replaceAll(/([^\\])"/g, '$1\\"')                         // Escape unescaped double quotes inside strings
// .replaceAll(/\\\"/g, '"')                           // Convert escaped quotes to normal quotes
//     .replaceAll(/\\\\/g, '\\')                          // Fix double backslashes
//     .replaceAll(/\\n|\\t|\\r/g, '')                     // Remove newline, tab, and carriage return escapes
//     .replaceAll(/,\s*([}\]])/g, '$1')                   // Remove trailing commas
//     .trim();                                         // Remove leading/trailing whitespace
    console.log(cleanedResponse);

  const parsedResponse = JSON.parse(cleanedResponse);
  return parsedResponse;
}
