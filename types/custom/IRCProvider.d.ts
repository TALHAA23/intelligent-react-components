import { AIResponse } from "@server-types/index";
import { Common } from "./common";

// action interface
type ACTIONS =
  | "new"
  | "update-status"
  | "update-error-or-response";
type STATUS = "unknown" | "pending" | "successful" | "refreshing" | "error";

export type Action = {
  type: ACTIONS;
  payload: IRCButtonRegistery;
};

export interface IRCButtonRegistery {
  filename: string;
  props: Partial<Common>;
  error?: Error;
  response?: AIResponse;
  status?: STATUS;
  refreshResponse: () => Promise<any>;
}

// state interface
export interface IRCRegisteryProviderState {
  registerButtons: IRCButtonRegistery[];
  register: (type: ACTIONS, payload: IRCButtonRegistery) => void;
}
