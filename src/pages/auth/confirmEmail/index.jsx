import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import Logo from "../../../components/shared/logo";

export default function () {
  const { push } = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    push("/portal");
  };
  return (
    <form onSubmit={handleSubmit}>
      <Container sx={{ pt: 6, textAlign: "center" }}>
        <Stack spacing={3}>
          <Box>
            <Logo />
            <Typography variant="h4">Account Verification</Typography>
          </Box>
          <Box>
            <Alert severity="info">
              Verify your account to complete signup! Enter 6 digit code sent to
              you via email.
            </Alert>
          </Box>
          <Box>
            <TextField
              type="number"
              autoFocus
              variant="standard"
              label="Code"
              name="verificationCode"
            />
          </Box>
          <Button disableElevation type="submit" variant="contained">
            Verify
          </Button>
        </Stack>
      </Container>
    </form>
  );
}
