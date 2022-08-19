import { Alert, Snackbar } from "@mui/material";
import useToast from "../../../hooks/useToast";

export default () => {
  const { toast } = useToast();

  const { severity, message, action, visible } = toast;

  return (
    <>
      {Boolean(severity) && Boolean(message) && Boolean(visible) && (
        <Snackbar open={visible}>
          <Alert severity={severity} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
