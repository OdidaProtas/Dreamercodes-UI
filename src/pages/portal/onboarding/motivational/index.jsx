import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { useAxios, useList, useToast } from "../../../../hooks";
import { useDispatch } from "../../../../state/hooks";
import useOnboardingProfile from "../hooks/useOnboardingProfile";

export default () => {
  const { push } = useHistory();

  const { profile } = useOnboardingProfile();

  const dispatch = useDispatch();
  const { loading, axiosAction } = useAxios("onboarding");

  const { showToast } = useToast();

  const { getItemsArray: getCoursesCategories } = useList({
    instance: "courses",
    slug: "courses_categories",
  });

  const { getItemsArray: getCourses } = useList({
    instance: "courses",
    slug: "courses",
  });

  const coursesCategories = getCoursesCategories();
  const courses = getCourses();

  const selectedCourse = courses.find(
    (course) => course.id === profile?.selectedPrefCourseId
  );

  function successHandler({ data }) {
    dispatch({
      type: "ADD_ENTRIES",
      payload: { ...data },
      context: "onboardingProfile",
    });
    showToast("success", "Information updated");
    push(`/portal/onboarding/experience`);
  }

  function errorHandler(error) {
    console.error(error);
    showToast("error", "An error occured");
  }

  function handleClick(id) {
    axiosAction({
      successHandler,
      errorHandler,
      method: "post",
      payload: {
        ...profile,
        isMotivated: true,
      },
      endpoint: "/onboarding",
    });
  }

  return (
    <div>
      <Container>
        <Box sx={{ textAlign: "center", mb: 5, px: { lg: 18 }, mt: 3 }}>
          <Stack spacing={4}>
            <Box
              elevation={0}
              sx={{ display: "fex", justifyContent: "center" }}
            >
              <Avatar
                sx={{ height: 120, width: 120 }}
                src={selectedCourse?.imageUrl}
                alt={selectedCourse?.title}
              />
            </Box>
            <Typography variant="h4">
              {selectedCourse?.title} is a great choice!
            </Typography>
            <Typography>
              Remember, learning is often challenging, but some of the most
              worthwhile things in life are. Dreamschool is here to help you
              every step of your journey.
            </Typography>

            <Typography variant="h5">
              Consistency takes our users to their chosen careers
            </Typography>
            <Box>
              <Button
                fullWidth
                disableElevation
                onClick={handleClick}
                variant="contained"
                disabled={loading}
              >
                {loading ? <CircularProgress size={20} /> : "Continue"}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Container>
    </div>
  );
};
