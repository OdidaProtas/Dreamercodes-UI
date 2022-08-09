import { Box, Button, Toolbar, Typography, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
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
          <Typography variant="h4">Dream School</Typography>
          <Typography variant="h6">
            A premier coding school by the dreamers, for the dreamers
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