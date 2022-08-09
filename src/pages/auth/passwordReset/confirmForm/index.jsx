import { Box, Button, Container, Typography } from "@mui/material";
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
      <Box>
        <Container>
          <Typography variant="h4">Password reset email sent.</Typography>
          <Typography>
            An email with a password reset link will be sent to your email to
            let you reset your password.
          </Typography>
          <Button
            onClick={() => push("/")}
            sx={{ mt: 3 }}
            disableElevation
            fullWidth
            variant="contained"
          >
            Go Home
          </Button>
        </Container>
      </Box>
    </Box>
  );
};
