import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Avatar,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Logo from "../logo";

export default () => {
  const { push } = useHistory();

  const { checkLoginStatus, getCurrentUser } = useAuth();

  const isLoggedIn = checkLoginStatus();

  return (
    <AppBar color="inherit" elevation={1}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Logo textOnly />
        </Box>
        {isLoggedIn && (
          <>
            <Box sx={{ mr: 2 }}>
              <Avatar
                onClick={() => push("/profile")}
                sx={{ cursor: "pointer" }}
              />
            </Box>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Button
              disableElevation
              onClick={() => push("/portal")}
              variant="contained"
            >
              Portal
            </Button>
            <Button
              sx={{ ml: 2 }}
              disableElevation
              onClick={() => push("/mentor")}
              variant="contained"
            >
              Mentor
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
