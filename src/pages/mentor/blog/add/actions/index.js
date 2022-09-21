import { useCallback } from "react";
import { useDispatch, useStateValue } from "../../../../../state/hooks";

export default function useActions() {
  const dispatch = useDispatch();
  const state = useStateValue();

  const addToState = useCallback(
    (data) => {
      dispatch({
        type: "ADD_ENTRIES",
        context: "articles",
        payload: { ...(state["articles"] ?? {}), [data.id]: data },
      });
    },
    [state["articles"]]
  );

  return { addToState };
}
