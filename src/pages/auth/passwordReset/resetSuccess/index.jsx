import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useHistory } from "react-router-dom";

export default () => {
  const { push } = useHistory();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Container>
        <Stack spacing={3}>
          <Typography variant="h5">Password reset success</Typography>
          <Alert severity="success">
            Your email has been reset successfully. You can now log into your
            account with your new password!
          </Alert>
          <Button
            onClick={() => push("/accounts")}
            variant="contained"
            fullWidth
            disableElevation
          >
            Log in
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};
