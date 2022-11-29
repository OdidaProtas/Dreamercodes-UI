import { useReducer } from "react";
import { createContext } from "react";

const initialState = {};

export const BuilderContext = createContext(initialState);

const reducer = (state, action) => {
  return { ...state };
};

export function BuilderProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BuilderContext.Provider value={{ ...state }}>
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {}
