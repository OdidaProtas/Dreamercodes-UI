import { useState } from "react";
import { useStateValue } from "../../state/hooks";
import useDialogActions from "./actions";

export default function useDialog(opts = {}) {
  const { scope = "LOCAL", name = "default" } = opts;
  const [open, setOpen] = useState(false);
  const { toggleGlobalDialog } = useDialogActions();

  const state = useStateValue();

  function toggle() {
    if (scope === "GLOBAL") {
      toggleGlobalDialog(name);
      return;
    }
    setOpen((o) => !o);
  }

  const isOpen = scope === "GLOBAL" ? state[`${name}Dialog`] : open;

  return [isOpen, toggle];
}
