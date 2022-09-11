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
import { useState } from "react";
import jwt_decode from "jwt-decode";
import { Link, useHistory } from "react-router-dom";
import { useToast, useAuth, useAxios, useQueryParams } from "../../../hooks";

import network from "../../../network";
import Logo from "../../../components/shared/logo";

export default function () {
  const { push } = useHistory();
  const { login } = useAuth();

  const { endpoints } = network;

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const { loading, error, axiosAction } = useAxios("auth");
  const { showToast } = useToast();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const [next] = useQueryParams(["next"]);

  console.log(next)

  function successHandler(res) {
    try {
      const accessToken = res.data.accessToken;
      localStorage.setItem("access_token", accessToken);
      const user = jwt_decode(accessToken);
      login(user);
      showToast("success", "Login successful");
      push("/portal");
    } catch (e) {
      showToast("error", "An error occured. Try again!");
    }
  }

  function errorHandler(err) {
    console.error(err);
    showToast("error", "An error occured. Try again");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosAction({
      method: "post",
      payload: { ...state },
      successHandler,
      errorHandler,
      endpoint: endpoints.AUTH_URLS.login,
    });
  };
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Box sx={{ textAlign: "center" }}>
            <Logo />
            <Typography variant="h4">Welcome back</Typography>

            <Typography>
              Get started building your dream projects sooner, not later.
            </Typography>
            {Boolean(next) && (
              <Alert sx={{ mt: 2 }} severity="error">
                Please log in to view the requested resource
              </Alert>
            )}
          </Box>

          <TextField
            label="Email Address"
            placeholder="Enter email address"
            fullWidth
            name={"email"}
            value={state?.email}
            onChange={handleChange}
            required
            type="email"
          />
          <TextField
            label="Password"
            placeholder="Enter your password"
            fullWidth
            type="password"
            required
            name="password"
            value={state?.password}
            onChange={handleChange}
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
                <Link to="/accounts/password-reset">Reset password</Link>
              </Grid>
              <Grid sx={{ textAlign: "right" }} item xs>
                <Link to="/accounts/signup">Create account</Link>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </form>
    </Container>
  );
}
