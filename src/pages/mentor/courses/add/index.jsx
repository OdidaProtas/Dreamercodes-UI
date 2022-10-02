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
import { useHistory, useLocation } from "react-router-dom";
import {
  useAuth,
  useAxios,
  useDocTitle,
  useItem,
  useToast,
} from "../../../../hooks";
import network from "../../../../network";
import TopicsForm from "./topicsForm";
import { useActions } from "./actions";
import useUpload, {
  useToggleUploadProgress,
} from "../../../../hooks/useUpload";
import { useDispatch } from "../../../../state/hooks";
import { useEffect } from "react";
import ImageUpload from "../../subjects/add/imageUpload";

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

export default function AddCourse() {
  useDocTitle("New Course");

  const { addCourseToState } = useActions();

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
  const toggleUpload = useToggleUploadProgress();

  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleUpload();
    let uploads;
    try {
      uploads = await uploadImages([
        { fileData: banner, field: "bannerUrl" },
        { fileData: logo, field: "imageUrl" },
      ]);
      toggleUpload();
    } catch (e) {
      toggleUpload();
    }

    const images = uploads.reduce((p, c) => {
      return { ...p, [c.field]: c.url };
    }, {});

    let data = { ...state, description: value };

    if (Boolean(images?.bannerUrl)) {
      data = { ...data, bannerUrl: images.bannerUrl };
    }

    if (Boolean(images?.imageUrl)) {
      data = { ...data, imageUrl: images.imageUrl };
    }

    axiosAction({
      method: "post",
      successHandler,
      errorHandler,
      payload: { ...data },
      endpoint: COURSES_URLS.courses,
    });
  };

  const dispatch = useDispatch();

  function successHandler(res) {
    const { data } = res;
    dispatch({
      type: "ADD_ENTRY",
      payload: { ...data },
      context: "courses",
    });
    push(`/mentor/courses/${data.id}`);
  }

  function errorHandler(e) {
    console.log(e);
    showToast("error", "An error occured");
  }

  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const itemId = params.get("item_id");
  const mode = params.get("mode");
  const isEdit = mode === "edit";

  const { getItem: getCourse } = useItem({
    slug: "courses",
    instance: "courses",
    itemId: { id: itemId },
  });

  const course = getCourse();

  useEffect(() => {
    if (Boolean(course)) {
      setState({ ...course });
    }
  }, [course]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <Box>
          <Toolbar sx={{ bgcolor: "background.default" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4">
                {isEdit ? "Edit" : "New"} Course
              </Typography>
            </Box>
            <Box>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIosIcon />}
                onClick={goBack}
              >
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
          value={course?.title}
        />
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <ImageUpload
                isEdit={isEdit}
                value={logo}
                existing={state?.imageUrl}
                handleChange={handleLogoChange}
                desc="Drag 'n' drop course logo image or click to upload"
              />
            </Grid>
            <Grid item xs>
              <ImageUpload
                isEdit={isEdit}
                existing={state?.bannerUrl}
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
