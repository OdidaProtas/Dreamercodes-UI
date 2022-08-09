import { useDispatch } from "../../state/hooks";

export default function useAuthActions() {
  const dispatch = useDispatch();

  function handleLoginSuccess(userData) {
    console.log(userData);
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
    dispatch({
      type: "RESET",
    });
  }

  return { handleLoginSuccess, handleLoginFailure, handleLogout };
}
