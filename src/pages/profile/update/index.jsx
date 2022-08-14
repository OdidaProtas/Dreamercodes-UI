import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/AttachFile";
import { useHistory, useRouteMatch } from "react-router-dom";
import UpdatePassword from "../../../components/dialogs/updatePassword";
import UpdateProfilePic from "../../../components/dialogs/updateProfilePic";

export default function () {
  const { push, goBack } = useHistory();
  const { url } = useRouteMatch();

  function handleSubmit(e) {
    e.preventDefault();
    push("/profile");
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box>
          <Stack spacing={2}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ position: "relative" }}>
                <Avatar sx={{ height: 108, width: 108 }} />
                <UpdateProfilePic />
              </Box>
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs>
                  <TextField label="First name" fullWidth />
                </Grid>
                <Grid item xs>
                  <TextField label="Last name" fullWidth />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <TextField label="Email Address" fullWidth />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                type="submit"
                disableElevation
                variant="contained"
                color="error"
                onClick={goBack}
              >
                Go back
              </Button>
              <Button
                type="submit"
                disableElevation
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Save Changes
              </Button>
            </Box>
            <Divider sx={{ my: 6 }} />
            <UpdatePassword />
          </Stack>
        </Box>
      </Box>
    </form>
  );
}
