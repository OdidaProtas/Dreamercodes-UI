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

export default function () {
  const { push } = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    push("/accounts/password-reset/success");
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
          <Box>
            <Typography variant="h4">Set a new password</Typography>
            <Typography>
              Enter a new password to complete your password reset
            </Typography>
          </Box>

          <TextField
            label="New password"
            placeholder="Enter your new password"
            fullWidth
          />
          <TextField
            label="Confirm password"
            placeholder="Confirm your new password"
            fullWidth
          />

          <Button type="submit" disableElevation variant="contained">
            Submit
          </Button>
          <Box>
            <Grid container>
              <Grid item xs>
                <Link to="/accounts">Sign in</Link>
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
