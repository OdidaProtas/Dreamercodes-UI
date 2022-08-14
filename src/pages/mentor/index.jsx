import { Box, Toolbar, Typography, Container } from "@mui/material";
import { Redirect, useRouteMatch } from "react-router-dom";
import Navbar from "../../components/shared/navbar";
import { useAuth } from "../../hooks/useAuth";

export default function () {
  const { url } = useRouteMatch();

  const { checkLoginStatus } = useAuth();

  const isLoggedIn = checkLoginStatus();

  if (!isLoggedIn) return <Redirect to={`/accounts?next=${url}`} />;

  return (
    <Container>
      <Navbar />
      <Toolbar />
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4">Welcome back, Mentor</Typography>
      </Box>
    </Container>
  );
}
