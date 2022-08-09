import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../../components/shared/logo";
import { useAuth } from "../../../hooks/useAuth";

export default function () {
  const { push } = useHistory();
  const { login } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username: "User" });
    push("/portal");
  };
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
        <Stack spacing={3}>
          <Box sx={{ textAlign: "center" }}>
            <Logo />
            <Typography variant="h4">Welcome back</Typography>
            <Typography>
              Get started building your dream projects sooner, not later.
            </Typography>
          </Box>

          <TextField
            label="Email Address"
            placeholder="Enter email address"
            fullWidth
          />
          <TextField
            label="Password"
            placeholder="Enter your password"
            fullWidth
          />

          <Button type="submit" disableElevation variant="contained">
            Submit
          </Button>
          <Box>
            <Grid container>
              <Grid item xs>
                <Link to="/accounts/password-reset">Forgot password</Link>
              </Grid>
              <Grid sx={{ textAlign: "right" }} item xs>
                <Link to="/accounts/signup">Need account? Register.</Link>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}