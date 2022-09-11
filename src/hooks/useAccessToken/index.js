import React from "react";
import useAuth from "../useAuth";
import jwt_decode from "jwt-decode";

export default function () {
  const { login } = useAuth();
  React.useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      const user = jwt_decode(accessToken);
      login(user);
    }
  }, []);
}
