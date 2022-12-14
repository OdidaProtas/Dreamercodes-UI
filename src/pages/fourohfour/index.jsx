import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
  ThemeProvider,
} from "@mui/material";
import AccountMenu from "../../components/auth/accountMenu";
import SupportDialog from "../../components/dialogs/support";

import Logo from "../../components/shared/logo";
import theme from "../landingPage/theme";

export default function FourOhFour() {
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        fullWidth
        maxWidth="sm"
        open
        hideBackdrop
        sx={{ backdropFilter: "blur(4px)", }}
      >
        <DialogContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Logo />
            <Box
              sx={{
                height: 81,
                width: 81,
                bgcolor: "background.newWhite",
                display: "flex",
              }}
            >
              <AccountMenu />
            </Box>
          </div>  
          <DialogContentText sx={{ my: 3 }}>
            This page does not exist. This URL {window.location.pathname} is
            invalid.
          </DialogContentText>
          <DialogContentText sx={{ my: 3, color: "red" }}>
            Error code: 404
          </DialogContentText>
          <SupportDialog />
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
