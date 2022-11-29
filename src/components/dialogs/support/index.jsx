import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import useDialog from "../../../hooks/useDialog";
import AccountMenu from "../../auth/accountMenu";
import Logo from "../../shared/logo";
export default function SupportDialog() {
  const [open, toggle] = useDialog()
  return (
    <>
      <Button fullWidth disableElevation onClick={toggle} variant="contained">Get help</Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        hideBackdrop
        sx={{ backdropFilter: "blur(4px)" }}
        onClose={toggle}
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
          <TextField label="Email address" fullWidth />
          <TextField label="Alternative email" fullWidth />
          <TextField label="Subject" fullWidth />
          <TextField label="Description" sx={{ my: 3 }} fullWidth />
          <Button fullWidth variant="contained">
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
