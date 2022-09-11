import { Alert, Snackbar } from "@mui/material";
import { useToast } from "../../../hooks";

export default () => {
  const { toast } = useToast();

  const { severity, message, action, visible } = toast;

  return (
    <>
      {Boolean(severity) && Boolean(message) && Boolean(visible) && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={visible}
        >
          <Alert severity={severity} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
