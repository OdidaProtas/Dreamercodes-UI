import { useCallback } from "react";
import { useStateValue } from "../../state/hooks";
import useAuthActions from "./actions";

export default function useAuth() {
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

  const checkVerificationStatus = useCallback(
    function () {
      const { user } = state;
      return Boolean(user?.emailVerified);
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

  const userHasRoles = useCallback(
    function (roles = []) {
      const { userRoles = [] } = state;
      let transformed = roles.map((role) => {
        if (role === "*") return true;
        return Boolean(userRoles.find((r) => r === role));
      });
      return Boolean(transformed.filter(Boolean).length);
    },
    [state?.user?.roles]
  );

  return {
    login,
    logout,
    checkLoginStatus,
    getCurrentUser,
    checkVerificationStatus,
    userHasRoles,
  };
}
