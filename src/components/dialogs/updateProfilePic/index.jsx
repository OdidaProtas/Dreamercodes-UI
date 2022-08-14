import {
  IconButton,
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

import EditIcon from "@mui/icons-material/Edit";

export default function () {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);
  return (
    <>
      <IconButton
        sx={{ position: "absolute", bottom: 5, right: -18 }}
        onClick={toggle}
      >
        <EditIcon />
      </IconButton>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={toggle}>
        <DialogTitle>Upload photo</DialogTitle>
        <DialogContent dividers></DialogContent>
        <DialogActions>
          <Button onClick={toggle}>Cancel</Button>
          <Button onClick={toggle}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
