import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Redirect, useHistory, useRouteMatch } from "react-router-dom";
import Loader from "../../../../components/shared/loader";
import { useAxios, useList, useToast } from "../../../../hooks";
import { useDispatch, useStateValue } from "../../../../state/hooks";
import { capitalizeFirstLetter } from "../../../../utils/utils";
import useOnboardingProfile from "../hooks/useOnboardingProfile";

export default () => {
  const [coursesOpen, setCoursesOpen] = useState(false);

  const { push } = useHistory();
  const { url } = useRouteMatch();

  const [selected, setSelected] = useState(false);

  const { prefferedCategory } = useStateValue();

  const dispatch = useDispatch();

  const { profile, loading: loadingProfile } = useOnboardingProfile();
  const { axiosAction, loading } = useAxios("onboarding");

  const { showToast } = useToast();

  const hasPrefference = Boolean(prefferedCategory);

  const category = hasPrefference ? prefferedCategory.split("_").join(" ") : "";

  const toggleAllCourses = () => setCoursesOpen((o) => !o);

  const { getItemsArray: getCourses, loading_courses: loadingCourses } =
    useList({
      instance: "courses",
      slug: "courses",
    });

  const courses = getCourses();

  function successHandler({ data }) {
    dispatch({
      type: "ADD_ENTRIES",
      payload: { ...data },
      context: "onboardingProfile",
    });
    showToast("success", "Information updated");
    push(`/portal/onboarding/motivational`);
  }

  function errorHandler(error) {
    console.error(error);
    showToast("error", "An error occured");
  }

  function handleClick(id) {
    setSelected(id);
    axiosAction({
      successHandler,
      errorHandler,
      method: "post",
      payload: {
        ...profile,
        selectedPrefCourseId: id,
        hasSelectedPrefCourse: true,
      },
      endpoint: "/onboarding",
    });
  }

  if (loadingCourses) {
    return (
      <Box sx={{ my: 12, ml: 7 }}>
        <Loader desc="Courses" />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 9, textAlign: "center" }}>
      <Stack spacing={2}>
        {!hasPrefference && (
          <Typography variant="h4">Select a course</Typography>
        )}

        {hasPrefference && (
          <Typography variant="h4">
            {capitalizeFirstLetter(category)}
          </Typography>
        )}
        <Typography>
          Don’t worry, you can add as many courses as you want later.
        </Typography>
        <Box>
          <Grid container spacing={3} sx={{ p: 6 }}>
            {courses.map((course, index) => {
              const { title, bannerUrl, id, imageUrl } = course;
              return (
                <Grid key={id} item xs={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      bgcolor: "rgba(117, 117, 117, 0.2)",
                      backgroundImage: `url(${bannerUrl})`,
                      backdropFilter: "blur(4px)",
                      p: 2,
                    }}
                  >
                    <Box>
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Avatar
                          style={{ width: 180, height: 180 }}
                          src={imageUrl}
                          alt={title}
                        />
                      </Box>

                      <Divider sx={{ my: 1 }} />
                      <Typography variant="h5">{title}</Typography>
                      {/* <Typography>100 Learners</Typography> */}
                      <Button
                        disabled={loading}
                        onClick={() => handleClick(id)}
                      >
                        {loading && selected === id ? (
                          <CircularProgress size={20} />
                        ) : (
                          "Select"
                        )}
                      </Button>
                      <Link>Learn More</Link>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
};
