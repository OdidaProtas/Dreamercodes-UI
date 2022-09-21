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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
} from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useHistory } from "react-router-dom";
import {
  useAuth,
  useAxios,
  useDocTitle,
  useItem,
  useList,
  useQueryParams,
  useToast,
} from "../../../../hooks";
import ImageUpload from "./imageUpload";
import network from "../../../../network";
import TopicsForm from "./topicsForm";
import courses from "../../courses";
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

  const [id] = useQueryParams(["id"]);

  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);

  const [state, setState] = useState({
    title: "",
    description: value,
    addedBy: user?.id,
    course: null,
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
      payload: { ...state, ...images },
      endpoint: COURSES_URLS.subjects,
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

  const { getItem: getCourse, loading_courses_item: loadingCourse } = useItem({
    instance: "courses",
    itemId: { id },
    slug: "courses",
  });

  const { getItemsArray: getCourses, loading_courses: loadingCourses } =
    useList({
      instance: "courses",
      slug: "courses",
    });

  const course = getCourse();

  const courses = getCourses();

  useEffect(() => {
    if (course) setState((p) => ({ ...p, course }));
  }, [course]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <Box>
          <Toolbar sx={{ bgcolor: "#68B0AB" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4">New Subject</Typography>
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
          label="Title"
        />

        {loadingCourse || (loadingCourses && <LinearProgress />)}
        {Boolean(courses.length) && (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Course</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state.course}
              label="Course"
              name="course"
              onChange={handleChange}
            >
              {courses?.map((course) => {
                return (
                  <MenuItem key={course.id} value={course}>
                    {course.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}

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
          placeholder="Subject description"
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
