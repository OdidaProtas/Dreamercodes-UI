import {
  Box,
  Button,
  Container,
  LinearProgress,
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

  const [selected, setSelected] = useState([]);

  const { profile } = useOnboardingProfile();

  const { showToast } = useToast();

  const dispatch = useDispatch();

  const { loading, axiosAction } = useAxios("onboarding");

  function successHandler({ data }) {
    dispatch({
      type: "ADD_ENTRIES",
      payload: { ...data },
      context: "onboardingProfile",
    });
    showToast("success", "Information updated");
    push(`/portal/onboarding/pace`);
  }

  function errorHandler(err) {
    console.error(err);
    showToast("error", "An error occured");
  }

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    axiosAction({
      errorHandler,
      successHandler,
      method: "post",
      endpoint: "/onboarding",
      payload: {
        ...profile,
        technicallity: value,
        isSurveyedAvailability: true,
      },
    });
  };

  return (
    <Container>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Box>
          <Stack sx={{ mt: 6 }} spacing={3}>
            <Typography variant="h4">
              How would you describe yourself?
            </Typography>

            {loading && <LinearProgress />}

            <ToggleButtonGroup
              orientation="vertical"
              value={selected}
              exclusive
              disabled={loading}
              onChange={handleChange}
            >
              <ToggleButton
                value="TECHNICAL_PROFESSION"
                aria-label="TECHNICAL_PROFESSION"
              >
                Technical Professional (I work with code as a dev or data
                scientist)
              </ToggleButton>
              <ToggleButton
                value="STUDENT_WITH_PLENTY_TIME"
                aria-label="STUDENT_WITH_PLENTY_TIME"
              >
                Student (With plenty of time)
              </ToggleButton>
              <ToggleButton value="HOBBYST" aria-label="HOBBYST">
                Hobbyist (This is just a hobby for me, not my whole life)
              </ToggleButton>
              <ToggleButton
                value="NON_TECHNICAL_NEWBIE"
                aria-label="NON_TECHNICAL_NEWBIE"
              >
                Non-technical Newbie (I'm looking to reskill myself)
              </ToggleButton>

              <ToggleButton value="BUSINESS_PERSON">
                Business Person (I have technical aspects to my job)
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};
