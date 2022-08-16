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
          alignItems: "center",
          textAlign: "center",
          height: "90vh",
        }}
      >
        <Box>
          <Stack spacing={2}>
            <Typography variant="h4">
              Do you already know which course you want to take?
            </Typography>
            <Button
              onClick={() => push(`${url}/select-courses`)}
              variant="contained"
              disableElevation
            >
              Yes, I know what course I want.
            </Button>
            <Button
              onClick={() => push(`${url}/categories`)}
              variant="contained"
              disableElevation
            >
              No, Please recommend me one.
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};
