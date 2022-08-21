import { useDispatch, useStateValue } from "../../state/hooks";

export default function useDialogActions(name) {
  const dispatch = useDispatch();
  const state = useStateValue();
  const dialog = state[`${name}Dialog`];

  function toggleGlobalDialog() {
    dispatch({
      type: "ADD_ENTRIES",
      context: `${name}Dialog`,
      payload: !Boolean(dialog),
    });
  }

  return { toggleGlobalDialog };
}
