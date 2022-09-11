import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../../components/shared/logo";
import { useToast, useAuth, useAxios } from "../../../hooks";
import jwt_decode from "jwt-decode";

import network from "../../../network";

export default function () {
  const { push } = useHistory();

  const [state, setState] = useState();

  const { endpoints } = network;

  const { login } = useAuth();

  const { loading, error, axiosAction } = useAxios("auth");
  const { showToast } = useToast();

  const handleChange = (e) => {
    setState((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  function successHandler(res) {
    localStorage.setItem("access_token", res?.data?.accessToken);
    try {
      const user = jwt_decode(res?.data?.accessToken);
      login(user);
      showToast("success", "Account created!");
      push("/portal");
    } catch (e) {
      showToast("error", "signup failed!");
    }
  }

  function errorHandler() {
    console.error(error);
    showToast("error", "signup failed!");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = { ...state };
    delete payload["confirmPassword"];
    axiosAction({
      method: "post",
      successHandler,
      errorHandler,
      payload,
      endpoint: endpoints.AUTH_URLS.reg,
    });
  };

  const passMissMatch = useMemo(
    () =>
      Boolean(state?.password) &&
      Boolean(state?.confirmPassword) &&
      Boolean(state?.password !== state?.confirmPassword),
    [state?.password, state?.confirmPassword]
  );

  const insufficientPass = useMemo(() => {
    return state?.password?.length < 8;
  }, [state?.password]);

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Box sx={{ textAlign: "center" }}>
            <Logo />
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4">Create Account</Typography>
            <Typography variant="h6">
              Create an account to start learning for free
            </Typography>
          </Box>
          <Box>
            <Grid container spacing={1}>
              <Grid item xs>
                <TextField
                  name="firstName"
                  required
                  onChange={handleChange}
                  label="First name"
                  placeholder="First name"
                  fullWidth
                  value={state?.fistName}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  name="lastName"
                  required
                  value={state?.lastName}
                  onChange={handleChange}
                  label="Last name"
                  placeholder="Last name"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>

          <TextField
            fullWidth
            name="email"
            required
            type="email"
            onChange={handleChange}
            value={state?.email}
            label="Email Address"
            placeholder="Enter email address"
          />

          {/* <Box>
            <CountrySelect />
          </Box> */}
          <Box>
            <Grid container spacing={2}>
              <Grid item xs>
                <TextField
                  name="password"
                  onChange={handleChange}
                  required
                  label="Password"
                  placeholder="Choose a password"
                  fullWidth
                  type="password"
                  value={state?.password}
                  error={passMissMatch || insufficientPass}
                  helperText={
                    passMissMatch
                      ? "Passwords do not match"
                      : insufficientPass
                      ? "Password must be atleast 8 characters"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs>
                <TextField
                  name="confirmPassword"
                  required
                  type="password"
                  value={state?.confirmPassword}
                  onChange={handleChange}
                  label="Confirm password"
                  placeholder="Confirm your password"
                  fullWidth
                  error={passMissMatch || insufficientPass}
                  helperText={
                    passMissMatch
                      ? "Passwords do not match"
                      : insufficientPass
                      ? "Password must be atleast 8 characters"
                      : ""
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Button
            type={loading ? "button" : "submit"}
            disableElevation
            variant="contained"
            disabled={loading || insufficientPass || passMissMatch}
          >
            {loading ? (
              <CircularProgress color="secondary" size={20} />
            ) : (
              "Submit"
            )}
          </Button>
          <Box>
            <Grid container>
              <Grid item xs>
                <Link to="/accounts/password-reset">Reset your password</Link>
              </Grid>
              <Grid sx={{ textAlign: "right" }} item xs>
                <Link to="/accounts">Login</Link>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </form>
    </Container>
  );
}
