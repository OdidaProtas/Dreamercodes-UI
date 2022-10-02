import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Toolbar,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useState, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useHistory } from "react-router-dom";
import { useAuth, useAxios, useDocTitle, useToast } from "../../../../hooks";
import network from "../../../../network";
import ImageUpload from "../../subjects/add/imageUpload";
import TopicsForm from "./topicsForm";

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "size",
  "color",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "align",
];

export default function AddPersons() {
  useDocTitle("New Course");

  const [topics, setTopics] = useState([]);

  const [value, setValue] = useState("");

  const {
    endpoints: { COURSES_URLS },
  } = network;

  const { goBack } = useHistory();

  const { getCurrentUser } = useAuth();
  const { showToast } = useToast();
  const { loading, axiosAction } = useAxios("courses");
  const user = getCurrentUser();

  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);

  const [state, setState] = useState({
    title: "",
    description: value,
    addedBy: user?.id,
  });

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
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadImages();
    axiosAction({
      method: "post",
      successHandler,
      errorHandler,
      payload: { ...state },
      endpoint: COURSES_URLS.courses,
    });
  };

  function successHandler(res) {
    const { data } = res;
    console.log(data);
  }

  function errorHandler(e) {
    console.log(e);
    showToast("error", "An error occured");
  }

  function uploadImages() {
    const files = [logo, banner];
    files.forEach((file, index) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dreamercodes");
      fetch("  https://api.cloudinary.com/v1_1/dreamercodes/image/upload", {
        method: "post",
        body: data,
      })
        .then((resp) => resp.json())
        .then((data) => {
          setState((prev) => ({
            ...prev,
            [index === 0 ? "imageUrl" : "bannerUrl"]: data.url,
          }));
        })
        .catch((err) => console.log(err));
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <Box>
          <Toolbar sx={{ bgcolor: "background.newWhite" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4">New User</Typography>
            </Box>
            <Box>
              <Button startIcon={<ArrowBackIosIcon />} onClick={goBack}>
                Go Back
              </Button>
            </Box>
          </Toolbar>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                onChange={handleChange}
                name={"firstName"}
                required
                fullWidth
                label="First Name"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={handleChange}
                name={"lastName"}
                required
                fullWidth
                label="Last Name"
              />
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
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
          formats={formats}
          placeholder="Course description"
          theme="snow"
          value={value}
          onChange={setValue}
        />
        {/* <Container>
        <Box
          sx={{
            display: "flex",
            my: 3,
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flexGow: 1 }}>
            <Typography variant="h6">Topics</Typography>
          </Box>
          <Box>
            <Button>Add topic</Button>
          </Box>
        </Box>
        <TopicsForm />
      </Container> */}
        <Button
          disabled={loading}
          type="submit"
          disableElevation
          variant="contained"
        >
          {loading ? <CircularProgress size={20} /> : "Save and Continue"}
        </Button>
      </Stack>
    </form>
  );
}
