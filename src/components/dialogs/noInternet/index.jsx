import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useEffect } from "react";
import { useStateValue } from "../../../state/hooks";

export default function NoInternet() {
  const { uploadProgress = false } = useStateValue();
  return (
    <>
      <Dialog
        sx={{ bgcolor: "background.newWhite", backdropFilter: "blur(4px)" }}
        hideBackdrop
        open={uploadProgress}
      >
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText variant="h6">
            Uploading Images...
          </DialogContentText>
          <Box sx={{ mt: 3 }}>
            <CircularProgress />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
