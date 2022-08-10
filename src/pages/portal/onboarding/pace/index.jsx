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
            <Typography variant="h4">What's your age?</Typography>
            <Button
              onClick={() => push(`/portal/onboarding/welcome`)}
              variant="contained"
              disableElevation
            >
              13 - 18
            </Button>
            <Button variant="contained" disableElevation>
              19 – 24
            </Button>
            <Button variant="contained" disableElevation>
              25-30
            </Button>
            <Button variant="contained" disableElevation>
              30+
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};
