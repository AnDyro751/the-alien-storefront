import React from "react";

export const LocaleContext = React.createContext({});
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_LOCALE":
      return {
        locale: action.payload || "en",
      };
    case "DELETE_LOCALE":
      return {
        locale: "en",
      };
    default:
      throw new Error();
  }
};

export const LocaleContextProvider = ({ children, data = {} }) => {
  const [state, dispatch] = React.useReducer(reducer, data);
  const value = { state, dispatch };
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};
