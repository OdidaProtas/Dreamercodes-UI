import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../../../../../components/shared/loader";
import { useItem } from "../../../../../hooks";

export default function Credentials() {
  const { push } = useHistory();
  const { id } = useParams();

  const { getItem: getAPP, loading_apps_item: loadingApps } = useItem({
    instance: "auth",
    slug: "apps",
  });

  const app = getAPP();

  if (loadingApps) {
    return (
      <>
        <Loader desc="app" />
      </>
    );
  }

  return (
    <>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "background.newWhite" }}>
        <Stack spacing={2}>
          
          <Box>
            <Typography>APP ID: {app?.name}</Typography>
          </Box>
          <Box>
            <Typography>Name: {app?.name}</Typography>
          </Box>
          <Box>
            <Typography>APP ID: {app?.name}</Typography>
          </Box>
        </Stack>
      </Paper>
    </>
  );
}
