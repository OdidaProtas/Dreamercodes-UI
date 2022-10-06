import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useHistory, useRouteMatch } from "react-router-dom";
import UpdatePassword from "../../../components/dialogs/updatePassword";
import ImageUpload from "../../mentor/courses/add/imageUpload";
import { ArrowBack } from "@mui/icons-material";
import { useAuth, useAxios, useItem, useList, useToast } from "../../../hooks";
import { useState } from "react";
import { useDispatch, useStateValue } from "../../../state/hooks";
import { useEffect } from "react";
import useUpload from "../../../hooks/useUpload";
import { useCallback } from "react";
import useProfiles from "../../../hooks/useProfiles";

export default function UpdateProfile() {
  const { push, goBack } = useHistory();

  const dispatch = useDispatch();

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
  });

  const [image, setImage] = useState(null);

  const { loading, axiosAction } = useAxios("auth");
  const [uploadingImages, setUploadImages] = useState(false);

  const { profile = {} } = useStateValue();
  const { showToast } = useToast();

  function successHandler({ data }) {
    dispatch({
      type: "ADD_ENTRIES",
      payload: { ...profile, ...data },
      context: "profiles",
    });
    showToast("success", "Profile updated");
  }

  function errorHandler(error) {
    console.error(error);
    showToast("error", "An error occured, update unsuccessful");
  }

  const uploadImages = useUpload();

  async function handleSubmit(e) {
    e.preventDefault();
    setUploadImages(true);
    const uploads = await uploadImages([
      { fileData: image, field: "imageUrl" },
    ]);

    if (Boolean(uploadImages.length)) {
      setUploadImages(false);
    }

    let allImages = { ...state };

    let images = uploads.reduce((p, c) => {
      return { ...p, [c.field]: c.url };
    }, {});

    if (images?.imageUrl) {
      allImages["imageUrl"] = images.imageUrl;
    }

    axiosAction({
      method: "post",
      endpoint: `/profiles/${user?.id}`,
      successHandler,
      errorHandler,
      payload: { ...state, ...allImages },
    });
  }

  function handleChange(e) {
    setState((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  const { getCurrentUser } = useAuth();

  const user = getCurrentUser();

  useEffect(() => {
    setState({ ...user });
  }, [user?.id]);

  const { getItem: getProfile } = useItem({
    instance: "auth",
    slug: "profiles",
    itemId: user?.id,
  });

  const currentProfile = useProfiles();
  const handleImageChange = useCallback(
    (data) => {
      setImage(data[0]);
    },
    [image]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "center",
          minHeight: "87vh",
        }}
      >
        <Box>
          <Stack spacing={2}>
            <Box sx={{ display: "flex", justifyContent: "right" }}>
              <Button
                type="submit"
                disableElevation
                variant="outlined"
                color="primary"
                startIcon={<ArrowBack />}
                onClick={goBack}
              >
                Go back
              </Button>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ position: "relative" }}>
                <Avatar
                  src={currentProfile?.imageUrl}
                  sx={{ height: 108, width: 108 }}
                />
              </Box>
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs>
                  <TextField
                    name="firstName"
                    onChange={handleChange}
                    label="First name"
                    fullWidth
                    value={state.firstName}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    onChange={handleChange}
                    name="lastName"
                    label="Last name"
                    fullWidth
                    value={state.lastName}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <ImageUpload
                value={image}
                handleChange={handleImageChange}
                desc="Upload profile picture"
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                type="submit"
                disableElevation
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={loading}
              >
                {loading ? <CircularProgress size={20} /> : "Save Changes"}
              </Button>
            </Box>
            <Divider sx={{ my: 6 }} />
            <UpdatePassword />
          </Stack>
        </Box>
      </Box>
    </form>
  );
}
