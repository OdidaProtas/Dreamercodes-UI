import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useHistory, useRouteMatch } from "react-router-dom";

export default () => {
  const { push } = useHistory();

  const { url } = useRouteMatch();

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
            <Button
              onClick={() => push(`/portal/onboarding/pace`)}
              variant="contained"
              disableElevation
            >
              Technical Professional (I work with code as a dev or data
              scientist)
            </Button>
            <Button variant="contained" disableElevation>
              Student (With plenty of time to learn){" "}
            </Button>
            <Button variant="contained" disableElevation>
              Hobbyist (This is just a hobby for me, not my whole life)
            </Button>
            <Button variant="contained">
              Non-technical Newbie (I'm looking to reskill myself)
            </Button>
            <Button variant="contained">
              Business Person (I have technical aspects to my job)
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};
