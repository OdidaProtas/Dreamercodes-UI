import { useMemo, useReducer } from "react";
import Context from "./context";
import initialState from "./initialstate";
import reducer from "./reducer";

export default ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(
    () => ({ ...state, dispatch }),
    [state, dispatch]
  );

  return (
    <Context.Provider value={{ ...contextValue }}>{children}</Context.Provider>
  );
};
