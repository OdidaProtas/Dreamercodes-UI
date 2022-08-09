import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export default () => {
  const { push } = useHistory();

  const { checkLoginStatus, getCurrentUser, logout } = useAuth();

  const isLoggedIn = checkLoginStatus();
  const user = getCurrentUser();

  return (
    <AppBar elevation={0}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography sx={{ cursor: "pointer" }} onClick={() => push("/")}>
            Dreamschool
          </Typography>
        </Box>
        {isLoggedIn && (
          <Button onClick={logout} variant="contained">
            Hi {user?.username}! Logout
          </Button>
        )}
        {!isLoggedIn && (
          <Button onClick={() => push("/portal")} variant="contained">
            Portal
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
