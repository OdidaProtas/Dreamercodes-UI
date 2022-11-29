import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
  ThemeProvider,
} from "@mui/material";

import theme from "../../../pages/landingPage/theme";
import AccountMenu from "../../auth/accountMenu";
import Logo from "../../shared/logo";
import SupportDialog from "../support";

export default function AccessDeniedHandler() {
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        fullWidth
        maxWidth="sm"
        open
        hideBackdrop
        sx={{ backdropFilter: "blur(4px)" }}
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
            Access denied. You do not have sufficient privileges to view this
            page. Contact system admin for help
          </DialogContentText>
          <DialogContentText sx={{ my: 3, color: "red" }}>
            Error code: 403
          </DialogContentText>
          <SupportDialog/>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
