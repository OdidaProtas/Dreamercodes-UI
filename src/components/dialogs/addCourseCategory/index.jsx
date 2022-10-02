import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "react-quill/dist/quill.snow.css";
import { Box, CircularProgress, Grid, Stack, TextField } from "@mui/material";
import ReactQuill from "react-quill";
import ImageUpload from "../../../pages/mentor/courses/add/imageUpload";
import { useCallback } from "react";
import { Add, AddCircle } from "@mui/icons-material";
import { useAuth, useAxios, useToast } from "../../../hooks";
import useUpload from "../../../hooks/useUpload";
import useActions from "./actions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function AddDialogCategory(props) {
  const [open, setOpen] = React.useState(false);
  const { addToState } = useActions();
  const [state, setState] = React.useState({
    title: "",
    imageUrl: "",
    description: "",
    bannerUrl: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [logo, setLogo] = React.useState(null);
  const [banner, setBanner] = React.useState(null);

  const { loading, axiosAction } = useAxios("courses");

  const uploadImages = useUpload();
  const { showToast } = useToast();

  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();

  const successHandler = (res) => {
    addToState(res.data);
    showToast("success", `${res.data.title} Saved`);
    setState((p) => ({ title: "", imageUrl: "", description: "" }));
  };

  const errorHandler = (error) => {
    console.error(error);
    showToast("error", "An error occured");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploads = await uploadImages([
      { fileData: banner, field: "bannerUrl" },
      { fileData: logo, field: "imageUrl" },
    ]);

    const images = uploads.reduce((p, c) => {
      return { ...p, [c.field]: c.url };
    }, {});

    axiosAction({
      method: "post",
      successHandler,
      errorHandler,
      payload: { ...state, author: user?.id, ...images },
      endpoint: "/courses_categories",
    });
  };

  const handleLogoChange = useCallback(
    (data) => {
      setLogo(data[0]);
    },
    [logo]
  );

  const handleBannerChange = useCallback(
    (data) => {
      setBanner(data[0]);
    },
    [logo]
  );

  const handleChange = (e) => {
    setState((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      {props.icon && (
        <IconButton onClick={handleClickOpen}>
          <AddCircle />
        </IconButton>
      )}
      {!props.icon && (
        <Button variant="outlined" onClick={handleClickOpen}>
          {props.addButtonText ? props.addButtonText : "Add Category"}
        </Button>
      )}

      <BootstrapDialog
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        hideBackdrop
        sx={{
          bgcolor: "rgba(117, 117, 117, 0.2)",
          backdropFilter: "blur(4px)",
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          New Category
        </BootstrapDialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                name="title"
                onChange={handleChange}
                label="Title"
                fullWidth
              />
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} lg={3}>
                    <ImageUpload
                      value={logo}
                      handleChange={handleLogoChange}
                      desc="Drag 'n' drop course logo image or click to upload"
                    />
                  </Grid>
                  <Grid item xs>
                    <ImageUpload
                      value={banner}
                      handleChange={handleBannerChange}
                      desc="Drag 'n' drop course banner image or click to upload"
                    />
                  </Grid>
                </Grid>
              </Box>
              <ReactQuill
                value={state.description}
                onChange={(v) => setState((p) => ({ ...p, description: v }))}
                placeholder="A short description"
              />
              <Button
                variant="contained"
                disableElevation
                fullWidth
                disabled={loading}
                type="submit"
                autoFocus
              >
                {loading ? <CircularProgress size={20} /> : "Save changes"}
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
