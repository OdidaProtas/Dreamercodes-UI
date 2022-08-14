import { Alert, Snackbar } from "@mui/material";
import useToast from "../../../hooks/useToast";

export default () => {
  const { toast } = useToast();

  const { severity, message, action, visible } = toast;

  return (
    <>
      <Snackbar open={visible} >
        <Alert>Hehe</Alert>
      </Snackbar>
    </>
  );
};
