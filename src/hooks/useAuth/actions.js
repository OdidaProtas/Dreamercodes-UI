import { useHistory } from "react-router-dom";
import { useDispatch } from "../../state/hooks";

export default function useAuthActions() {
  const dispatch = useDispatch();
  const { push } = useHistory();

  function handleLoginSuccess(userData) {
    dispatch({
      type: "ADD_ENTRIES",
      context: "user",
      payload: userData,
    });

    dispatch({
      type: "ADD_ENTRIES",
      context: "isLoggedIn",
      payload: true,
    });
  }

  function handleLoginFailure() {
    dispatch({
      type: "ADD_ENTRIES",
      context: "loginError",
    });
  }

  function handleLogout() {
    localStorage.clear();
    dispatch({
      type: "RESET",
    });
    push("/");
  }

  return { handleLoginSuccess, handleLoginFailure, handleLogout };
}
