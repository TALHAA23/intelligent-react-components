import { AIResponse } from "../types";
export default function clearResponse(response: string): AIResponse {
  const cleanedResponse = response
    .replaceAll(/```(json|javascript)?/g, "") // Remove code block markers
    .replaceAll(/[^\x20-\x7E]/g, " ") // Remove non-printable characters
    .replaceAll(/^\s+|\s+$/g, "") // Trim leading and trailing spaces
    .trim(); // Remove leading/trailing whitespace
  const parsedResponse = JSON.parse(cleanedResponse);
  return parsedResponse;
}
