import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Stack,
  TextField,
  ThemeProvider,
} from "@mui/material";

import theme from "../../../pages/landingPage/theme";
import Logo from "../../shared/logo";

export default function LoginHelper() {
  return (
    <ThemeProvider theme={theme}>
      <Dialog open fullWidth maxWidth="sm" hideBackdrop sx={{ backdropFilter: "blur(4px)" }}>
        <DialogContent>
          <form>
            <Stack spacing={2}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Logo />
              </div>
              <DialogContentText>
                You need to be logged in to view this page.
              </DialogContentText>
              <TextField fullWidth label="Username" />
              <TextField fullWidth label="Password" type={"password"} />
              <Button disableElevation fullWidth variant="contained">
                Login
              </Button>
              <Button disableElevation fullWidth variant="outlined">
                Register
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
