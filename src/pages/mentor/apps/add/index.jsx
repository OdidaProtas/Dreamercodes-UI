import { ArrowBack, CheckBox } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  TextField,
  Toolbar,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { useCallback } from "react";
import useUpload from "../../../../hooks/useUpload";
import { useAxios, useToast } from "../../../../hooks";
import ImageUpload from "../../subjects/add/imageUpload";
import { useDispatch } from "../../../../state/hooks";
import Typography from "../../../landingPage/components/Typography";

export default function AppsForm() {
  const { goBack, push } = useHistory();

  const [state, setState] = useState({
    name: "",
  });

  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);

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

  const uploadImages = useUpload();

  const { loading, axiosAction } = useAxios("auth");
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploads = await uploadImages([{ fileData: logo, field: "imageUrl" }]);

    const images = uploads.reduce((p, c) => {
      return { ...p, [c.field]: c.url };
    }, {});

    let currentState = { ...state };

    if (Boolean(images)) {
      currentState = { ...currentState, ...images };
    }
    axiosAction({
      method: "post",
      successHandler,
      errorHandler,
      payload: currentState,
      endpoint: "/apps",
    });
  };
  const dispatch = useDispatch();

  function successHandler(res) {
    const { data } = res;
    dispatch({
      type: "ADD_ENTRY",
      payload: { ...data, isNew: true },
      context: "apps",
    });
    showToast("success", "Record saved");
    push(`/mentor/apps/${data.id}`);
  }

  function errorHandler(e) {
    console.log(e);
    showToast("error", "An error occured");
  }

  const handleChange = (e) => {
    setState((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const isValidName =
    /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/.test(
      state.name
    );

  return (
    <form onSubmit={handleSubmit}>
      <Toolbar />
      <Stack spacing={3}>
        <Box sx={{ display: "flex", mt: 3 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4">Create App</Typography>
          </Box>
          <Box>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={goBack}
            >
              Go back
            </Button>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              required
              fullWidth
              name="name"
              onChange={handleChange}
              value={state.name}
              label="Name"
              error={Boolean(state.name) && !isValidName}
            />
            <Box>
              <ImageUpload
                isEdit
                existing={state.imageUrl}
                value={logo}
                handleChange={handleLogoChange}
                desc="Drag 'n' drop app image or click to upload"
              />
            </Box>
            <Button
              disabled={loading}
              type="submit"
              variant="contained"
              fullWidth
            >
              {loading ? <CircularProgress size={20} /> : "Save"}
            </Button>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </Stack>
    </form>
  );
}
