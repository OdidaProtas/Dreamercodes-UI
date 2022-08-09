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

export default function () {
  const { push } = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    push("/accounts");
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
            <Typography sx={{ my: 2 }} variant="h5">
              Welcome
            </Typography>
            <Typography>
              Get started building your dream projects sooner, not later.
            </Typography>
          </Box>
          <Box>
            <Grid container spacing={1}>
              <Grid item xs>
                <TextField
                  label="First name"
                  placeholder="First name"
                  fullWidth
                />
              </Grid>
              <Grid item xs>
                <TextField
                  label="Last name"
                  placeholder="Last name"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>

          <TextField
            fullWidth
            label="Email Address"
            placeholder="Enter email address"
          />

          <Select label="I am interested in">
            <MenuItem>Web development</MenuItem>
            <MenuItem>Mobile development</MenuItem>
            <MenuItem>DevOPS</MenuItem>
            <MenuItem>Blockchain development</MenuItem>
            <MenuItem>I am still undecided</MenuItem>
          </Select>

          <Box>
            <Grid container spacing={2}>
              <Grid item xs>
                <TextField
                  label="Password"
                  placeholder="Choose a password"
                  fullWidth
                />
              </Grid>
              <Grid item xs>
                <TextField
                  label="Confirm password"
                  placeholder="Confirm your password"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
          <Button type="submit" disableElevation variant="contained">
            Submit
          </Button>
          <Box>
            <Grid container>
              <Grid item xs>
                <Link to="/accounts/password-reset">Reset your password</Link>
              </Grid>
              <Grid sx={{ textAlign: "right" }} item xs>
                <Link to="/accounts">Already registered? Login</Link>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
