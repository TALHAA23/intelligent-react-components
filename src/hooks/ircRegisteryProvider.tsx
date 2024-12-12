import { Action, IRCRegisteryProviderState } from "@/types/custom/IRCProvider";
import { createContext, ReactNode, useContext, useReducer } from "react";
const initialValue: IRCRegisteryProviderState = {
  registerButtons: [],
  register(type, payload) {
    type;
    payload;
  },
};
const IrcRegisteryContext = createContext(initialValue);

const reducer = (prevState: IRCRegisteryProviderState, action: Action) => {
  const { type, payload } = action;
  const findExisting = prevState.registerButtons.filter(
    (button) => button.filename == payload.filename
  )[0];
  switch (type) {
    case "new-button":
      if (findExisting) {
        return prevState;
      }
      return {
        ...prevState,
        registerButtons: [...prevState.registerButtons, action.payload],
      };
    case "update-button-status": {
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
    case "update-button-error-or-response": {
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
  useContext(IrcRegisteryContext);

export default function IRCRegisteryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialValue);
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
