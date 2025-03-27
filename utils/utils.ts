import { ACTIONS } from "@types";

export const urls = {
  generativeAi: "http://localhost:7070/prompt-to-code",
};

export const postMethod: RequestInit = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export const IRC_ACTIONS: { [key: string]: ACTIONS } = {
  new: "new",
  updateStatus: "update-status",
  updateErrorAndResponse: "update-error-or-response",
};
