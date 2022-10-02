import { AppBar, Box, Button, Toolbar, Avatar } from "@mui/material";
import { useAuth } from "../../../hooks";
import { useHistory } from "react-router-dom";
import AccountMenu from "../../auth/accountMenu";
import Typography from "../../../pages/landingPage/components/Typography";

export default function Navbar() {
  const { push } = useHistory();

  const { checkLoginStatus, getCurrentUser } = useAuth();

  const isLoggedIn = checkLoginStatus();

  return (
    <AppBar elevation={0}>
      <Toolbar>
        <Box onClick={() => push("/")} sx={{ flexGrow: 1, cursor: "pointer" }}>
          <Typography color="secondary" variant="h6">
            Dreamercodes
          </Typography>
        </Box>
        <Box>
          <AccountMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
