import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

export default () => {
  const { push } = useHistory();
  return (
    <Container>
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Stack spacing={3}>
          <Box>
            <img
              height={144}
              style={{ borderRadius: "50%" }}
              src="https://sololearnuploads.azureedge.net/uploads/courses/1014.png"
              alt=""
            />
          </Box>
          <Typography variant="h4">
            Frontend Development is a great choice!
          </Typography>
          <Typography>
            Remember, learning is often challenging, but some of the most
            worthwhile things in life are. Dreamschool is here to help you every
            step of your journey.
          </Typography>
          <Box>
            <img src="https://www.sololearn.com/Images/dev_chart.png" alt="" />
          </Box>
          <Typography variant="h5">
            Consistency takes our users to their chosen careers
          </Typography>
          <Box>
            <Button
              onClick={() => push("/portal/onboarding/experience")}
              variant="contained"
            >
              Continue
            </Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};
