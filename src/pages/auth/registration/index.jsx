import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useAxios from "../../../network/hooks/useAxios";
import Logo from "../../../components/shared/logo";
import { REGISTRATION_URL } from "../../../network/endpoints";
import useToast from "../../../hooks/useToast";

export default function () {
  const { push } = useHistory();

  const [state, setState] = useState();

  const { data, loading, error, axiosAction } = useAxios();
  const { showToast } = useToast();

  const handleChange = (e) => {
    setState((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  function successHandler() {
    console.log(data);
    localStorage.setItem("access_token", data?.accessToken)
  }

  function errorHandler() {
    console.log(error);
    showToast("error", "signup failed!");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosAction({
      method: "post",
      endpoint: REGISTRATION_URL,
      payload: { ...state },
      successHandler,
      errorHandler,
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Box sx={{ textAlign: "center" }}>
            <Logo />
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4">Signup</Typography>
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
    </Box>
  );
}
