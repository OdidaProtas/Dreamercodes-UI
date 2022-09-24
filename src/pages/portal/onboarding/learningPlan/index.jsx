import {
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  Box,
  Grid,
  Avatar,
  CircularProgress,
} from "@mui/material";
import LottieControl from "../../../../components/animations";
import TimerIcon from "@mui/icons-material/Timer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useHistory } from "react-router-dom";
import useOnboardingProfile from "../hooks/useOnboardingProfile";
import { useAxios, useList, useToast } from "../../../../hooks";
import { useDispatch } from "../../../../state/hooks";

export default function () {
  const { push } = useHistory();

  const { profile } = useOnboardingProfile();

  const { getItems: getCourses } = useList({
    instance: "courses",
    slug: "courses",
  });

  const courses = getCourses();

  const course = Boolean(courses) ? courses[profile.selectedPrefCourseId] : {};

  const jan312009 = new Date();
  const threefromnow = jan312009.setMonth(jan312009.getMonth() + 3);

  const endDate = new Date(threefromnow);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const { loading, axiosAction } = useAxios("onboarding");

  const dispatch = useDispatch();
  const { showToast } = useToast();

  function successHandler({ data }) {
    
    dispatch({
      type: "ADD_ENTRIES",
      payload: { ...data },
      context: "onboardingProfile",
    });
    showToast("success", "Information updated");
    push("/portal/onboarding/payment");
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
        expectedFinish: endDate.getTime(),
        hasStarted: true,
        dateStarted: Date.now(),
      },
      endpoint: "/onboarding",
    });
  }

  return (
    <Container sx={{ textAlign: "center", pb: 6, px: { lg: 20 } }}>
      <Stack spacing={5}>
        <Box>
          <LottieControl />
          <Typography variant="h4">Awesome! You’re all set up</Typography>
          <Typography sx={{ mt: 6 }} variant="h6">
            You'll complete the {course?.title} course by {endDate.getDay()}{" "}
            {monthNames[endDate.getMonth()]}. Want to learn faster? You can
            adjust your practice goal later.
          </Typography>
        </Box>
        <Box sx={{ px: { lg: 9 } }}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: "azure" }}>
            <Grid container>
              <Grid item xs>
                <Box sx={{ display: "flex", my: 2, justifyContent: "center" }}>
                  <Avatar
                    style={{ height: 72, width: 72, my: 3 }}
                    src={course?.imageUrl}
                    alt=""
                  />
                </Box>

                <Box sx={{ textAlign: "center" }}>
                  <Typography>LEARN</Typography>
                  <Typography variant="h6">{course?.title}</Typography>
                </Box>
              </Grid>
              <Grid item xs>
                <Grid container>
                  <Grid item xs>
                    <Box
                      sx={{ display: "flex", my: 2, justifyContent: "center" }}
                    >
                      <Avatar
                        style={{ height: 72, width: 72, my: 3 }}
                        src={course?.imageUrl}
                        alt=""
                      />
                    </Box>

                    <Box sx={{ textAlign: "center" }}>
                      <Typography>PRACTICE</Typography>
                      <Typography variant="h6">1 Lesson a day</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs>
                <Grid container>
                  <Grid item xs>
                    <Box
                      sx={{ display: "flex", my: 2, justifyContent: "center" }}
                    >
                      <Avatar
                        style={{ height: 72, width: 72, my: 3 }}
                        src={course?.imageUrl}
                        alt=""
                      />
                    </Box>

                    <Box sx={{ textAlign: "center" }}>
                      <Typography>FINISH BY</Typography>
                      <Typography variant="h6">
                        {course?.duration ??
                          `${endDate.getDay()} ${
                            monthNames[endDate.getMonth()]
                          }`}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        <Box>
          <Button
            onClick={handleClick}
            variant="contained"
            disabled={loading}
            disableElevation
            fullWidth
          >
            {loading ? <CircularProgress size={20} /> : "Continue"}
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}

// entities: ["database/models/**/*.ts"],
