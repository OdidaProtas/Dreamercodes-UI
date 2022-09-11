import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import jwt_decode from "jwt-decode";
import network from "../../../network";
import { useState, useEffect } from "react";

import Logo from "../../../components/shared/logo";
import ReactCodeInput from "react-verification-code-input";

import { useToast, useAxios, useAuth, useQueryParams, useDocTitle } from "../../../hooks";
import { Link, Redirect, useHistory, useRouteMatch } from "react-router-dom";
import ResendVerificationCode from "../../../components/auth/resendVerificationCode";

export default function () {
  const { push } = useHistory();

  const { endpoints } = network;

  const { loading, axiosAction } = useAxios("auth");
  const { showToast } = useToast();
  const { getCurrentUser, checkLoginStatus, login } = useAuth();

  const user = getCurrentUser();
  const isLoggedIn = checkLoginStatus();

  const [state, setState] = useState({
    verificationCode: "",
  });

  const [next] = useQueryParams(["next"]);

  function successHandler(res) {
    const accessToken = res.data.accessToken;
    if (accessToken) {
      const user = jwt_decode(accessToken);
      login(user);
      localStorage.setItem("access_token", accessToken);
      showToast("success", "Your account has been verified!");
      if (next) {
        push(next);
      } else {
        push("/portal");
      }
    }
  }

  function errorHandler(err) {
    console.error(err);
    showToast("error", "An error occured while verifying your account!");
  }

  const handleSubmit = (e) => {
    if (e.preventDefault) {
      e?.preventDefault();
    }
    axiosAction({
      method: "post",
      payload: { verificationCode: state.verificationCode },
      successHandler,
      errorHandler,
      endpoint: `${endpoints.AUTH_URLS.verifyEmail}/${user?.id}`,
    });
  };


  function handleChange(v) {
    setState({ ...state, verificationCode: v });
  }

  const { url } = useRouteMatch();

  useEffect(() => {
    showToast("warning", "Your account has not been verified");
  }, []);

  useDocTitle("Verify Account")

  if (!isLoggedIn) return <Redirect to={`/accounts?next=${url}`} />;

  return (
    <form onSubmit={handleSubmit}>
      <Container sx={{ pt: 2, textAlign: "center" }}>
        <Stack spacing={3}>
          <Box>
            <Logo />
            <Typography variant="h4">Account Verification</Typography>
          </Box>
          <Box>
            <Alert severity="info">
              Hi, {user?.firstName} {user?.lastName} verify your account to
              complete signup! Enter 6 digit code sent to you via email.
            </Alert>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ ml: { lg: 9 } }}>
              <ReactCodeInput
                required
                // onComplete={handleSubmit}
                autoFocus
                type="number"
                onChange={handleChange}
              />
            </Box>
          </Box>

          <Button
            disabled={loading}
            disableElevation
            type="submit"
            variant="contained"
          >
            {loading ? <CircularProgress size={20} /> : "Verify"}
          </Button>
          <ResendVerificationCode />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link to="/accounts/signup">Create Account</Link>
            <Link to="/accounts">Log in</Link>
          </Box>
        </Stack>
      </Container>
    </form>
  );
}
