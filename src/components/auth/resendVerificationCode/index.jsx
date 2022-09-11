import { Button, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth, useToast, useAxios } from "../../../hooks";

import network from "../../../network";

export default function () {
  const [resendIn, setResendIn] = useState(0);

  const { endpoints } = network;

  const { getCurrentUser, checkLoginStatus } = useAuth();
  const { loading, axiosAction } = useAxios("auth");
  const { showToast } = useToast();

  const user = getCurrentUser();
  const isLoggedIn = checkLoginStatus();

  function resend() {
    if (!isLoggedIn) {
      showToast("info", "Log in and try again");
      return;
    }
    axiosAction({
      method: "post",
      successHandler,
      errorHandler,
      payload: { email: user?.email },
      endpoint: endpoints.AUTH_URLS.requestReset,
    });
  }

  function successHandler(data) {
    setResendIn(60);
    showToast("success", "New verification code has been emailed to you");
  }

  function errorHandler(err) {
    setResendIn(0);
    showToast("error", "An error occured, log in and try again");
  }

  useEffect(() => {
    let interval;
    if (resendIn > 0) {
      interval = setInterval(() => {
        setResendIn((p) => p - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [resendIn]);

  return (
    <>
      <Button
        onClick={resend}
        disabled={resendIn > 0 || loading}
        fullWidth
        variant="outlined"
      >
        {loading ? (
          <CircularProgress size={20} />
        ) : resendIn > 0 ? (
          `Resend in ${resendIn} seconds`
        ) : (
          "Resend"
        )}
      </Button>
    </>
  );
}
