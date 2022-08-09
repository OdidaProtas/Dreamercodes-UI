import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../../../components/shared/logo";

export default function () {
  const { push } = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    push("/accounts/password-reset/email-sent");
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
              label="Email Address"
              placeholder="Enter email address"
              fullWidth
            />

            <Button type="submit" disableElevation variant="contained">
              Submit
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
