import { useCallback } from "react";
import { useStateValue } from "../../state/hooks";
import useAuthActions from "./actions";

export function useAuth() {
  const state = useStateValue();

  const { handleLoginSuccess, handleLogout } = useAuthActions();

  const login = useCallback(
    function (userData) {
      handleLoginSuccess(userData);
    },
    [state]
  );

  const logout = useCallback(function () {
    handleLogout();
  }, []);

  const checkLoginStatus = useCallback(
    function () {
      const { isLoggedIn } = state;
      return isLoggedIn;
    },
    [state]
  );

  const getCurrentUser = useCallback(
    function () {
      const { user } = state;
      return user;
    },
    [state]
  );

  return {
    login,
    logout,
    checkLoginStatus,
    getCurrentUser,
  };
}
