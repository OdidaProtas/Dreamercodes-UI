import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  CircularProgress,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import { useAxios, useItem, useList, useToast } from "../../../hooks";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "../../../state/hooks";

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const { getItem } = useItem({
    instance: "auth",
    slug: "apps",
  });

  const { getItems } = useList({ instance: "auth", slug: "apps" });

  const app = getItem();
  const apps = getItems();

  const [state, setState] = useState(false);

  const error = app?.slug !== state;

  const { loading, axiosAction } = useAxios("auth");
  const { push } = useHistory();
  const { showToast } = useToast();
  const dispatch = useDispatch();

  function successHandler({ data }) {
    let items = { ...apps };
    delete items[data?.id];
    dispatch({
      type: "ADD_ENTRIES",
      payload: { ...items },
      context: "apps",
    });
    showToast("success", "Organization deleted");
    push("/mentor/apps");
  }

  function errorHandler(err) {
    console.error(err);
    showToast("error", "An error occured");
  }

  function handleSubmit(e) {
    e.preventDefault();
    axiosAction({
      method: "post",
      endpoint: "/apps",
      successHandler,
      errorHandler,
      payload: { isDeactivated: true, deactivationDate: Date.now() },
    });
  }

  return (
    <Dialog
      fullWidth
      hideBackdrop
      sx={{ backdropFilter: "blur(8px)" }}
      onClose={handleClose}
      open={open}
    >
      <DialogTitle>Delete Organization</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          Confirm deletion: Type the app id on the textfield below
        </DialogContentText>
        <DialogContentText>APP ID: {app?.slug}</DialogContentText>
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setState(e.target.value)}
            fullWidth
            sx={{ my: 2 }}
          />
          <Button
            disableElevation
            //   onClick={handleClickOpen}
            variant="contained"
            color="error"
            fullWidth
            disabled={error || loading}
            type="submit"
          >
            {loading ? <CircularProgress size={20} /> : "DELETE"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function DeleteDiallog() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button
        disableElevation
        onClick={handleClickOpen}
        variant="contained"
        color="error"
        fullWidth
      >
        DELETE
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
