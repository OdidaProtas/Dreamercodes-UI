import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth, useAxios, useToast } from "../../../../hooks";
import { useDispatch, useStateValue } from "../../../../state/hooks";
import actions from "../actions";

export default () => {
  const { push } = useHistory();
  const { handleOnboarded } = actions();

  const { getCurrentUser } = useAuth();

  const user = getCurrentUser();

  const [selected, setSelected] = useState([]);

  const { profile } = useStateValue();

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
    push(`/portal/onboarding/learning-plan`);
  }

  function errorHandler(err) {
    console.error(err);
    showToast("error", "An error occured");
  }

  const handleChange = () => {
    axiosAction({
      errorHandler,
      successHandler,
      method: "post",
      endpoint: "/onboarding",
      payload: {
        ...profile,
        isWelcomed: true,
      },
    });
  };

  return (
    <Container>
      <Box sx={{ mt: 3, textAlign: "center", mb: 6 }}>
        <Stack spacing={3}>
          <Typography variant="h4">Hang tight!</Typography>
          <Typography variant="h6">
            Hold on for a few seconds while we're developing your custom
            learning plan.
          </Typography>
          <Typography sx={{ color: "#40BF9C" }} variant="h3">
            That's all, {user?.firstName} {user?.lastName}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Paper sx={{ width: "fit-content", p: 3 }}>
              <Typography>Meet one of our happy users</Typography>
              <img
                width={300}
                src="https://www.sololearn.com/Images/psycho_loading.jpg"
                alt=""
              />
              <Typography>
                {" "}
                <i>
                  "Dreamschool helped me learn to code <br /> and land a job in
                  less <br />
                  than a year"
                </i>{" "}
              </Typography>
              <Typography>
                Jeremy, 23, mobile developer from Nairobi, KE
              </Typography>
            </Paper>
          </Box>
          <Box>
            <Button
              fullWidth
              disableElevation
              onClick={handleChange}
              variant="contained"
            >
              {loading ? <CircularProgress size={20} /> : "Thanks"}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};
