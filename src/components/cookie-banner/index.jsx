import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function () {
  const [open, setOpen] = React.useState(
    () => !Boolean(localStorage.getItem("cookie-consented") === "true")
  );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const isConsented = window.localStorage.getItem("cookie-consented");
    if (!Boolean(isConsented)) {
      setTimeout(() => {
        localStorage.setItem("cookie-consented", true);
      }, 69000);
    }
  }, []);

  const { pathname } = useLocation();

  const isMentor = /\/mentor/.test(pathname);
  const isPortal = /\/portal/.test(pathname);
  const isAccounts = /\/accounts/.test(pathname);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div style={{ position: "fixed", bottom: 10, left: 9, zIndex: 99999 }}>
      {open && !isMentor && !isPortal && !isAccounts && (
        <SnackbarContent
          message={
            "We use Cookies to collect information when you visit our site. You can learn more about how we use this information in our Privacy Policy. By closing this banner or continuing to use our site, you consent to our use of Cookies"
          }
          action={action}
        />
      )}
    </div>
  );
}
