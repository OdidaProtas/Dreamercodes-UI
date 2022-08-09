import { useContext } from "react";
import { Context } from "..";

export function useStateValue() {
  return useContext(Context);
}

export function useDispatch() {
  const { dispatch } = useStateValue();
  return dispatch;
}

export function useReduceArrayToObject() {
  return (arr, key) => {
    return (arr ?? []).reduce((prev, curr) => {
      prev[curr[key]] = curr;
      return prev;
    }, {});
  };
}

export function useMapObjectToArray() {
  return (obj) => {
    return Object.values(obj ?? {});
  };
}
