import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useAxios, useToast } from "../../../../hooks";
import { useDispatch } from "../../../../state/hooks";
import useOnboardingProfile from "../hooks/useOnboardingProfile";

export default () => {
  const { push } = useHistory();

  const { url } = useRouteMatch();

  const { loading, axiosAction } = useAxios("onboarding");

  const { profile } = useOnboardingProfile();

  const dispatch = useDispatch();

  const { showToast } = useToast();

  const [selected, setValue] = useState("");

  function successHandler({ data }) {
    dispatch({
      type: "ADD_ENTRIES",
      payload: { ...data },
      context: "onboardingProfile",
    });
    showToast("success", "Information updated");
    push(`/portal/onboarding/availability`);
  }

  function errorHandler(err) {
    console.error(err);
    showToast("error", "An error occured");
  }

  const handleChange = (e) => {
    const value = e.target.value;
    axiosAction({
      errorHandler,
      successHandler,
      method: "post",
      endpoint: "/onboarding",
      payload: {
        ...profile,
        experience: value,
        isSurveyedExperience: true,
      },
    });
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          height: "90vh",
        }}
      >
        <Box sx={{ pt: 6 }}>
          <Stack spacing={5}>
            <Typography variant="h4">
              How much coding experience do you have?
            </Typography>
            <ToggleButtonGroup
              orientation="vertical"
              value={selected}
              exclusive
              disabled={loading}
              onChange={handleChange}
            >
              <ToggleButton value="TOTALY_NEW" aria-label="list">
                {loading && selected === "TOTALY_NEW" ? (
                  <CircularProgress size={20} />
                ) : (
                  "I am totally new to coding."
                )}
              </ToggleButton>
              <ToggleButton value="BEGINNER" aria-label="module">
                {loading && selected === "BEGINNER" ? (
                  <CircularProgress size={20} />
                ) : (
                  "I know little about coding."
                )}
              </ToggleButton>
              <ToggleButton value="EXPERT" aria-label="quilt">
                {loading && selected === "EXPERT" ? (
                  <CircularProgress size={20} />
                ) : (
                  "I know a lot about coding."
                )}
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};
