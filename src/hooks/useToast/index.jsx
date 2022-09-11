import { useStateValue } from "../../state/hooks";
import actions from "./actions";

export default () => {
  const { handleShowSnackBar, handleHideSnackBar } = actions();
  const { toast } = useStateValue();

  function showToast(severity, message, action) {
    handleShowSnackBar({
      severity,
      message,
      action,
    });
    setTimeout(() => handleHideSnackBar(), 6000);
  }

  const toasty = toast ?? {
    severity: "",
    message: "",
    action: "",
    visible: false,
  };

  return { showToast, toast: toasty };
};
