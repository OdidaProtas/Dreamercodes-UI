import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function () {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);
  return (
    <>
      <Button onClick={toggle}>Update Password</Button>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={toggle}>
        <DialogTitle>Update password</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Enter old and new password below
          </DialogContentText>
          <Stack spacing={2}>
            <TextField type="password" label="Current password" />
            <Divider />
            <TextField type="password" label="New password" />
            <TextField type="password" label="Confrm password" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggle} >Cancel</Button>
          <Button onClick={toggle} >Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
