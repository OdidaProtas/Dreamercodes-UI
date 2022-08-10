import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useHistory, useRouteMatch } from "react-router-dom";

export default () => {
  const { push } = useHistory();

  const { url } = useRouteMatch();

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
            <Typography variant="h4">
              How much coding experience do you have?
            </Typography>
            <Button
              onClick={() => push(`/portal/onboarding/availability`)}
              variant="contained"
              disableElevation
            >
              I am totally new to coding.
            </Button>
            <Button variant="contained" disableElevation>
              I know little about coding.
            </Button>
            <Button variant="contained" disableElevation>
              I know a lot about coding.
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};
