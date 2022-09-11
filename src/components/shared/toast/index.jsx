import Close from "@mui/icons-material/Close";
import { Alert, IconButton, Snackbar } from "@mui/material";
import { useToast } from "../../../hooks";

export default () => {
  const { toast, hideToast } = useToast();

  const { severity, message, visible } = toast;

  return (
    <>
      {Boolean(severity) && Boolean(message) && Boolean(visible) && (
        <Snackbar 
          onClose={hideToast}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={visible}
          action={
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={hideToast}
            >
              <Close />
            </IconButton>
          }
        >
          <Alert severity={severity} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
