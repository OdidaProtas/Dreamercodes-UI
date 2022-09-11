import {
  Alert,
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
import { useHistory } from "react-router-dom";
import ReactCodeInput from "react-verification-code-input";
import Logo from "../../../../components/shared/logo";
import { useToast, useAxios } from "../../../../hooks";
import network from "../../../../network";

export default () => {
  const { push } = useHistory();
  const [state, setState] = useState();

  const {
    endpoints,
  } = network;

  const { loading, axiosAction } = useAxios("auth");
  const { showToast } = useToast();

  function handleCodeChange(value) {
    setState({ ...state, verificationCode: value });
  }
  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axiosAction({
      method: "post",
      endpoint: endpoints.AUTH_URLS.resetPassword,
      payload: { ...state },
      successHandler,
      errorHandler,
    });
  }

  function successHandler(res) {
    showToast(
      "success",
      "Password has been reset. Login with your new password"
    );
    push("/accounts");
  }

  function errorHandler(err) {
    showToast("error", "An error occured during password reset");
  }

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
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          textAlign: "center",
          mb: 9,
          mt: -6,
        }}
      >
        <Box>
          <Container>
            <Box>
              <Logo />
            </Box>
            <Typography variant="h4">Password reset.</Typography>
            <Alert severity="info">
              Password reset code has been sent to your email
            </Alert>
            <Box>
              <Stack spacing={3}>
                <Box sx={{ pt: 3, textAlign: "left" }}>
                  <p>Verification Code</p>
                  <ReactCodeInput
                    required
                    autoFocus
                    type="number"
                    onChange={handleCodeChange}
                  />
                </Box>
                <TextField
                  onChange={handleChange}
                  label="Email address"
                  name="email"
                  value={state?.email}
                  type="email"
                  required
                />
                <Box>
                  <Grid container spacing={1}>
                    <Grid item xs>
                      <TextField
                        fullWidth
                        required
                        onChange={handleChange}
                        label="New Password"
                        name="password"
                        value={state?.password}
                        type="password"
                      />
                    </Grid>
                    <Grid item xs>
                      <TextField
                        fullWidth
                        required
                        onChange={handleChange}
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={state?.confirmPassword}
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
              </Stack>
            </Box>
            <Button
              sx={{ mt: 3 }}
              disableElevation
              fullWidth
              type="submit"
              disabled={loading}
              variant="contained"
            >
              {loading ? <CircularProgress size={20} /> : "Submit"}
            </Button>
          </Container>
        </Box>
      </Box>
    </form>
  );
};
