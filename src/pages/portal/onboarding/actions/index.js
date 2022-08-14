import { useDispatch } from "../../../../state/hooks";

export default function () {
  const dispatch = useDispatch();
  function handleOnboarded() {
    dispatch({
      type: "ADD_ENTRIES",
      context: "onBoarded",
      payload: true,
    });
  }

  return { handleOnboarded };
}
