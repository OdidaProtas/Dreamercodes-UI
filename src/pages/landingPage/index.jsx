import { Box, Button, Toolbar, Typography, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
import Logo from "../../components/shared/logo";
import Navbar from "../../components/shared/navbar";

export default function () {
  const { push } = useHistory();
  return (
    <>
      <Navbar />
      <Toolbar />
      <Box
        sx={{
          minHeight: "50vh",
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
          <Typography variant="h4">Dream School</Typography>
          <Typography variant="h6">
            A premier online coding bootcamp by the dreamers, for the dreamers
          </Typography>
          <Button
            disableElevation
            variant="contained"
            onClick={() => push("/accounts/signup")}
          >
            Get Started
          </Button>
        </Stack>
      </Box>
    </>
  );
}
