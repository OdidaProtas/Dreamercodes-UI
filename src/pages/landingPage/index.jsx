import {
  Box,
  Button,
  Toolbar,
  Typography,
  Stack,
  Divider,
  Container,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import Logo from "../../components/shared/logo";
import Navbar from "../../components/shared/navbar";
import { useAuth } from "../../hooks/useAuth";

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
    <Container>
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
          <Button disableElevation variant="contained" onClick={handleCOA}>
            {"Get started"}
          </Button>
          <Divider />
        </Stack>
      </Box>
    </Container>
  );
}
