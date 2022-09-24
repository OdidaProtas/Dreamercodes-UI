import {
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { useHistory, useRouteMatch } from "react-router-dom";

export default function ({ course }) {
  const { push } = useHistory();
  const { url } = useRouteMatch();
  const { imageUrl, id } = course;
  return (
    <Grid
      item
      onClick={() => push(`${url}/${id}`)}
      xs={3}
      sx={{ cursor: "pointer" }}
    >
      <Paper sx={{ p: 2 }}>
        <Stack spacing={3}>
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar style={{ height: 100, width: 100 }} src={imageUrl} alt="" />
          </Box>

          <Divider />
          <Typography variant="h6">Web Development Fundamentals</Typography>
        </Stack>
      </Paper>
    </Grid>
  );
}
