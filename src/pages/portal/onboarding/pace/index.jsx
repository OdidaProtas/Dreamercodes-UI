import {
  Box,
  Button,
  Container,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useAxios, useToast } from "../../../../hooks";
import { useDispatch, useMapObjectToArray } from "../../../../state/hooks";

export default () => {
  const { push } = useHistory();

  const { url } = useRouteMatch();

  const [selected, setSelected] = useState([]);

  const { profile } = useMapObjectToArray();

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
    push(`/portal/onboarding/welcome`);
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
        age: value,
        isSurveyedAge: true,
      },
    });
  };

  //welcome
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
          <Stack spacing={3}>
            <Typography variant="h4">What's your age?</Typography>

            <ToggleButtonGroup
              orientation="vertical"
              value={selected}
              exclusive
              disabled={loading}
              onChange={handleChange}
            >
              <ToggleButton
                value="THIRTY_EIGHTEEN"
                aria-label="THIRTY_EIGHTEEN"
              >
                13 - 18
              </ToggleButton>
              <ToggleButton
                value="NINETEEN_TWENTYFOUR"
                aria-label="NINETEEN_TWENTYFOUR"
              >
                19 – 24
              </ToggleButton>
              <ToggleButton
                value="TWENTYFIVE_THIRTY"
                aria-label="TWENTYFIVE_THIRTY"
              >
                25-30
              </ToggleButton>
              <ToggleButton value="THIRTY_PLUS" aria-label="THIRTY_PLUS">
                30+
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};
