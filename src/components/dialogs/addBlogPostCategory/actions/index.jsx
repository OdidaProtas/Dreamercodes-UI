import { useCallback } from "react";
import { useDispatch } from "../../../../state/hooks";

export default function useActions() {
  const dispatch = useDispatch();

  const addToState = useCallback((data) => {
    dispatch({
      type: "ADD_ENTRIES",
      payload: data,
      context: "blog-topics",
    });
  });

  return { addToState };
}
