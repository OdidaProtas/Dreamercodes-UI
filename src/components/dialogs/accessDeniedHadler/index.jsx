import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  ThemeProvider,
} from "@mui/material";

import theme from "../../../pages/landingPage/theme";
import Logo from "../../shared/logo";

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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Logo />
          </div>
          <DialogContentText sx={{ my: 3 }}>
            Access denied. You do not have sufficient privileges to view this
            page. Contact system admin for help
          </DialogContentText>
          <Button variant="contained" fullWidth disableElevation>
            Login
          </Button>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
