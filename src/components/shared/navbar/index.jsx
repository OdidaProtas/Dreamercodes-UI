import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Avatar,
  Typography,
} from "@mui/material";
import Logo from "../logo";
import { useAuth } from "../../../hooks";
import { useHistory } from "react-router-dom";

export default () => {
  const { push } = useHistory();

  const { checkLoginStatus, getCurrentUser } = useAuth();

  const isLoggedIn = checkLoginStatus();

  return (
    <AppBar elevation={0}>
      <Toolbar>
        <Box onClick={() => push("/")} sx={{ flexGrow: 1, cursor: "pointer" }}>
          <Typography variant="h5">DREAMERCODES</Typography>
        </Box>
        <Box>
          <Button
            sx={{ ml: 2, mr: 3 }}
            disableElevation
            size="small"
            onClick={() => push("/blog")}
            variant="contained"
          >
            Blog
          </Button>
        </Box>
        {isLoggedIn && (
          <>
            <Box sx={{ mr: 2, display: "flex" }}>
              <Box>
                <Button
                  sx={{ ml: 2, mr: 3, mt: 0.6 }}
                  disableElevation
                  size="small"
                  onClick={() => push("/mentor")}
                  variant="contained"
                >
                  Mentor
                </Button>
              </Box>

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
            >
              Portal
            </Button>
            <Button
              sx={{ ml: 2 }}
              disableElevation
              onClick={() => push("/mentor")}
            >
              Mentor
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
