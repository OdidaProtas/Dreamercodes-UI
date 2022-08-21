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
import { useState, useMemo } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../../../components/shared/logo";
import useToast from "../../../../hooks/useToast";
import { useAxios } from "../../../../network";
import { REQUEST_RESET_URL } from "../../../../network/endpoints";

export default function () {
  const { push } = useHistory();

  const [state, setState] = useState();

  const { loading, axiosAction } = useAxios();
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosAction({
      method: "post",
      endpoint: REQUEST_RESET_URL,
      payload: { ...state },
      successHandler,
      errorHandler,
    });
  };

  function handleChange(e) {
    setState({ ...state, email: e.target.value });
  }

  function successHandler(res) {
    showToast("success", "Request successful. Check your email");
    push("/accounts/password-reset/email-sent");
  }

  function errorHandler(err) {
    showToast("error", "An error occured!");
  }

  return (
    <Box sx={{mt:5}} >
      <form onSubmit={handleSubmit}>
        <Container>
          <Stack spacing={3}>
            <Box sx={{ textAlign: "center" }}>
              <Logo />
              <Typography variant="h4">Reset your password</Typography>
              <Typography>
                Enter your email address and a password reset link will be sent
                to your email.
              </Typography>
            </Box>

            <TextField
              type="email"
              value={state?.email}
              onChange={handleChange}
              name="email"
              required
              label="Email Address"
              placeholder="Enter email address"
              fullWidth
            />

            <Button
              disabled={loading}
              type="submit"
              disableElevation
              variant="contained"
            >
              {loading ? <CircularProgress size={20} /> : "Submit"}
            </Button>
            <Box>
              <Grid container>
                <Grid item xs>
                  <Link to="/accounts/signup">Create Account</Link>
                </Grid>
                <Grid sx={{ textAlign: "right" }} item xs>
                  <Link to="/accounts">Log in to your account</Link>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Container>
      </form>
    </Box>
  );
}
