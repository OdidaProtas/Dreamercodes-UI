import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

import BgHome from "../../../assets/images/bghome.png";
import { useAuth } from "../../../hooks";
import Logo from "../../shared/logo";

export default function () {
  const { push } = useHistory();

  const { checkLoginStatus } = useAuth();
  const isLoggedIn = checkLoginStatus();

  function handleCOA() {
    if (isLoggedIn) {
      push("/portal");
    } else {
      push("/accounts/signup");
    }
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs>
        <Box
          sx={{
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Stack spacing={3}>
            <Box>
              <Logo />
            </Box>
            <Typography variant="h4">
              A premier online bootcamp to help you build your dream projects
              sooner
            </Typography>
            <Typography>Built for the dreamers, by the dreamers</Typography>
            <Button disableElevation variant="contained" onClick={handleCOA}>
              {"Get started"}
            </Button>
            <Divider />
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <img
          width="100%"
          src={BgHome}
          alt="An illustration for the home page"
        />
      </Grid>
    </Grid>
  );
}
