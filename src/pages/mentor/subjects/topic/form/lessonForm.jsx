import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import { useHistory, useParams } from "react-router-dom";
import { useAxios, useList, useToast } from "../../../../../hooks";
import TextField from "../../../../landingPage/components/TextField";
import Typography from "../../../../landingPage/components/Typography";
import "react-quill/dist/quill.snow.css";
import ImageUpload from "../../add/imageUpload";
import { useCallback } from "react";
import useUpload from "../../../../../hooks/useUpload";
import { useDispatch } from "../../../../../state/hooks";

export default function () {
  const { goBack, push } = useHistory();

  const [state, setState] = useState({
    title: "",
    course: "",
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

  const {
    getItems: getUnits,
    loading_subjects: loadingUnits,
    getItemsArray,
  } = useList({
    instance: "courses",
    slug: "units",
  });

  const units = getUnits();

  const unitsArray = getItemsArray();

  const { id, topic } = useParams();
  const { loading, axiosAction } = useAxios("courses");
  const { showToast } = useToast();

  const initialSubject = Boolean(units) ? units[id] : {};

  useEffect(() => {
    if (initialSubject) setState((p) => ({ ...p, course: initialSubject.id }));
  }, [initialSubject?.id]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
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
      endpoint: "/lessons",
    });
  };

  const dispatch = useDispatch();

  function successHandler(res) {
    const { data } = res;
    dispatch({
      type: "ADD_ENTRY",
      payload: { ...data, isNew: true },
      context: "lessons",
    });
    showToast("success", "Record saved");
    push(`/mentor/subjects/${id}/${topic}`);
  }

  function errorHandler(e) {
    console.log(e);
    showToast("error", "An error occured");
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Box sx={{ display: "flex" }}>
          <Box>
            <IconButton onClick={goBack}>
              <ArrowBack />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, pl: 3 }}>
            <Typography variant="h4">New Lesson</Typography>
          </Box>
        </Box>
        <Divider />
        <TextField
          required
          name="title"
          onChange={handleChange}
          value={state.title}
          label="Title"
        />
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: "1" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Unit</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state.unit}
                label="Unit"
                name="unit"
                required
                onChange={handleChange}
              >
                {unitsArray.map((unit) => {
                  return (
                    <MenuItem key={unit.id} value={unit.id}>
                      {unit.title}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {loadingUnits && <LinearProgress />}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", pl: 2 }}>
            <Box>
              <Button
                onClick={() => push("/mentor/subjects/new")}
                variant="contained"
              >
                Add Unit
              </Button>
            </Box>
          </Box>
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
          onChange={(val) => setState((p) => ({ ...p, description: val }))}
          value={state.description}
        />
        <Button disabled={loading} type="submit" variant="contained" fullWidth>
          {loading ? <CircularProgress size={20} /> : "Save"}
        </Button>
      </Stack>
    </form>
  );
}
