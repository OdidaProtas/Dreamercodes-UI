import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Redirect, useHistory, useRouteMatch } from "react-router-dom";
import { useToast, useAuth, useAxios } from "../../../../hooks";
import { useStateValue } from "../../../../state/hooks";
import actions from "../actions";
import network from "../../../../network";
import useOnboardingProfile from "../hooks/useOnboardingProfile";
import Loader from "../../../../components/shared/loader";

export default () => {
  const { push } = useHistory();

  const [selectedCategory, setSelected] = useState("");

  const { endpoints } = network;

  const { profile, loading: loadingProfile } = useOnboardingProfile();
  const { url } = useRouteMatch();

  const { loading, axiosAction } = useAxios("onboarding");
  const { getCurrentUser } = useAuth();
  const { showToast } = useToast();
  const { handledispatchOnboarding } = actions();

  const user = getCurrentUser();

  function successHandler(res) {
    const { data } = res;
    handledispatchOnboarding(data);
    if (data.hasPreference) {
      push(`${url}/select-courses`);
    } else push(`${url}/categories`);
  }

  function errorHandler(err) {
    console.log(err);
    showToast("error", "An error occured, refresh the page and try again");
  }

  function handleClick(hasPreference) {
    setSelected(hasPreference ? "hasPreference" : "");
    axiosAction({
      successHandler,
      errorHandler,
      method: "post",
      payload: {
        ...profile,
        user: user.id,
        hasPreference,
        isSurveyedCoursePreference: true,
      },
      endpoint: "/onboarding",
    });
  }

  if (loadingProfile || loadingProfile === "undefined") {
    return (
      <Box sx={{ my: 12, ml: 7 }}>
        <Loader />
      </Box>
    );
  }

  
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "90vh",
        }}
      >
        <Box>
          <Stack spacing={4}>
            <Typography variant="h4">
              Do you already know which course you want to take?
            </Typography>
            <Button
              size="large"
              disabled={loading}
              onClick={() => handleClick(true)}
              variant="outlined"
              disableElevation
              sx={{ textTransform: "none" }}
            >
              {loading && selectedCategory === "hasPreference" ? (
                <CircularProgress size={20} />
              ) : (
                "Yes, I know what course I want"
              )}
            </Button>
            <Button
              size="large"
              disabled={loading}
              onClick={() => handleClick(false)}
              variant="outlined"
              sx={{ textTransform: "none" }}
              disableElevation
            >
              {loading && selectedCategory !== "hasPreference" ? (
                <CircularProgress size={20} />
              ) : (
                "No, Please recommend me one"
              )}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};
