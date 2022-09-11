import { AppBar, Box, Button, Toolbar, Avatar } from "@mui/material";
import Logo from "../logo";
import { useAuth } from "../../../hooks";
import { useHistory } from "react-router-dom";

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
        <Box>
          <Button
            sx={{ ml: 2, mr: 3 }}
            disableElevation
            size="small"
            color="inherit"
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
                  color="inherit"
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
