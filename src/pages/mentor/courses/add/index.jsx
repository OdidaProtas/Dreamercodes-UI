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
import ImageUpload from "./imageUpload";
import network from "../../../../network";
import TopicsForm from "./topicsForm";
import { useActions } from "./actions";
import useUpload from "../../../../hooks/useUpload";

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

export default function () {
  useDocTitle("New Course");

  const { addCourseToState } = useActions();

  const [topics, setTopics] = useState([]);

  const [value, setValue] = useState("");

  const {
    endpoints: { COURSES_URLS },
  } = network;

  const { goBack, push } = useHistory();

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
  const uploadImages = useUpload();

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
      payload: { ...state, description: value, ...images },
      endpoint: COURSES_URLS.courses,
    });
  };

  function successHandler(res) {
    const { data } = res;
    addCourseToState(data);
    push(`/mentor/courses/${data.id}`);
  }

  function errorHandler(e) {
    console.log(e);
    showToast("error", "An error occured");
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <Box>
          <Toolbar sx={{ bgcolor: "#68B0AB" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4">New Course</Typography>
            </Box>
            <Box>
              <Button startIcon={<ArrowBackIosIcon />} onClick={goBack}>
                Go Back
              </Button>
            </Box>
          </Toolbar>
        </Box>

        <TextField
          onChange={handleChange}
          name={"title"}
          required
          label="Course title"
        />
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
