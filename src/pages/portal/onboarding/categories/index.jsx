import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import MonitorIcon from "@mui/icons-material/Monitor";
import CasinoIcon from "@mui/icons-material/Casino";
import SettingsIcon from "@mui/icons-material/Settings";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Link, useHistory } from "react-router-dom";
import actions from "../actions";
import { useAxios, useList, useToast } from "../../../../hooks";
import { useState } from "react";
import Loader from "../../../../components/shared/loader";
import { useDispatch } from "../../../../state/hooks";
import useOnboardingProfile from "../hooks/useOnboardingProfile";

export default function () {
  const { push } = useHistory();

  const dispatch = useDispatch();
  const { handleSelectedCategory } = actions();
  const [selected, setSelected] = useState("");

  const { profile, loading: loadingProfile } = useOnboardingProfile();

  const { showToast } = useToast();
  const { loading, axiosAction } = useAxios("onboarding");

  const {
    loading_courses_categories: loadingCoursesCategories,
    getItemsArray: getCoursesCategories,
  } = useList({
    instance: "courses",
    slug: "courses_categories",
  });

  const coursesCategories = getCoursesCategories();

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
        selectedPrefCourseCategoryId: id,
        hasSelectedPrefCourse: true,
      },
      endpoint: "/onboarding",
    });
  }

  if (loadingCoursesCategories || loadingProfile) {
    return (
      <Box sx={{ my: 9, pl: 8 }}>
        <Loader />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 9, textAlign: "center" }}>
      <Stack spacing={2}>
        <Typography variant="h4">WHAT WOULD YOU LIKE TO CREATE?</Typography>
        <Typography>
          We will get to you with a call on how to prepare for your selected
          path
        </Typography>
        <Box>
          <Grid container spacing={3} sx={{ p: 6 }}>
            {coursesCategories.map((course, index) => {
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
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: "azure",
                          border: "1px solid lightgray",
                        }}
                      >
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
}
