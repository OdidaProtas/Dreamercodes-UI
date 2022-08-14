import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory, useRouteMatch } from "react-router-dom";
import CertGrid from "../../../components/certifications/certGrid";

export default function () {
  const { push } = useHistory();
  const { url } = useRouteMatch();

  return (
    <Box
      sx={{
        mt: 3,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box>
        <Stack spacing={1}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar sx={{ height: 108, width: 108 }} />
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4">Brian Odida</Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6">brian.odida@gmail.com</Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Button
              disableElevation
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => push(`${url}/update`)}
            >
              Edit Profile
            </Button>
          </Box>
          <Box>
            <Divider sx={{ my: 3 }} />
          </Box>
          
        </Stack>
      </Box>
    </Box>
  );
}
