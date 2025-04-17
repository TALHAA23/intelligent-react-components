import { Action, IRCRegisteryProviderState } from "@/types/custom/IRCProvider";
import { IRC_ACTIONS } from "@utils/utils";
import React from "react";
const initialValue: IRCRegisteryProviderState = {
  registerButtons: [],
  register(type, payload) {
    type;
    payload;
  },
};
const IrcRegisteryContext = React.createContext(initialValue);

const reducer = (prevState: IRCRegisteryProviderState, action: Action) => {
  const { type, payload } = action;
  const findExisting = prevState.registerButtons.filter(
    (button) => button.filename == payload.filename
  )[0];
  switch (type) {
    case IRC_ACTIONS.new:
      if (findExisting) {
        return prevState;
      }
      return {
        ...prevState,
        registerButtons: [...prevState.registerButtons, action.payload],
      };
    case IRC_ACTIONS.updateStatus: {
      const updatedButtons = prevState.registerButtons.map((button) =>
        button.filename == payload.filename
          ? { ...button, status: payload.status }
          : button
      );
      return {
        ...prevState,
        registerButtons: updatedButtons,
      };
    }
    case IRC_ACTIONS.updateErrorAndResponse: {
      const updatedButtons = prevState.registerButtons.map((button) =>
        button.filename == payload.filename
          ? {
              ...button,
              error: payload.error,
              response: payload.response,
              status: payload.status,
            }
          : button
      );
      return { ...prevState, registerButtons: updatedButtons };
    }
    default:
      return prevState;
  }
};

export const useIrcRegistriesAndRegister = () =>
  React.useContext(IrcRegisteryContext);

export default function IRCRegisteryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer(reducer, initialValue);
  const updateState: IRCRegisteryProviderState["register"] = (
    type,
    payload
  ) => {
    dispatch({ type, payload });
  };
  return (
    <IrcRegisteryContext.Provider
      value={{
        ...state,
        register: updateState,
      }}
    >
      {children}
    </IrcRegisteryContext.Provider>
  );
}
