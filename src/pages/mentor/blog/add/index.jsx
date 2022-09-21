import {
  Button,
  Box,
  Typography,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState, useCallback } from "react";
import ReactQuill from "react-quill";
import { useHistory } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { useAxios, useList, useToast } from "../../../../hooks";
import { useStateValue } from "../../../../state/hooks";
import AddBlogPostCategory from "../../../../components/dialogs/addBlogPostCategory";
import useUpload from "../../../../hooks/useUpload";
import useAuth from "../../../../hooks/useAuth";
import ImageUpload from "../../courses/add/imageUpload";
import useActions from "./actions";

export default function () {
  const { push } = useHistory();
  const globalState = useStateValue();
  const { addToState } = useActions();
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
    push(`/mentor/blog/article/${res.data.id}`);
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
      endpoint: "/articles",
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

  const [state, setState] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { getItemsArray: getSubTopics } = useList({
    instance: "courses",
    slug: "blog-topics",
  });

  const topics = getSubTopics();
  const loadingSubTopics = globalState["loading_blog-topics"];

  return (
    <>
      <Stack spacing={2}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h5">New article</Typography>
            <Typography>Add a new blog article</Typography>
          </Box>
          <Box>
            {/* <Button
              onClick={handleClikAddButton}
              disableElevation
              variant="contained"
            >
              Add Blog article
            </Button> */}
          </Box>
        </Box>
        <Divider />
        <form onSubmit={handleSubmit}>
          <Stack spacing={1}>
            <TextField
              required
              onChange={handleChange}
              placeholder="Create a title for the blog"
              label="Title"
              name="title"
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Position</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state.position}
                label="Position"
                required
                name="position"
                onChange={handleChange}
              >
                <MenuItem value={"first_feature"}>Hero</MenuItem>
                <MenuItem value={"second_feature"}>Featured 1</MenuItem>
                <MenuItem value={"third_feature"}>Featured 2</MenuItem>
                <MenuItem value={"about"}>About</MenuItem>
              </Select>
            </FormControl>
            <Box>
              <Grid container>
                <Grid item xs={11}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={state.category}
                      label="Category"
                      name="category"
                      onChange={handleChange}
                    >
                      {topics.map((topic) => {
                        return (
                          <MenuItem key={topic.id} value={topic.id}>
                            {topic.title}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs>
                  <Box
                    sx={{
                      height: "100%",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AddBlogPostCategory icon />
                  </Box>
                </Grid>
              </Grid>
            </Box>

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
              theme="snow"
              placeholder="Say your story"
              value={state.description}
              onChange={(value) =>
                setState((prev) => ({ ...prev, description: value }))
              }
            />
            <Button
              type="submit"
              disabled={loading}
              disableElevation
              variant="contained"
            >
              {loading ? <CircularProgress size={20} /> : "Save article"}
            </Button>
          </Stack>
        </form>
      </Stack>
    </>
  );
}
