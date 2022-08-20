import { Divider, Grid, Paper, Stack, Typography, Box } from "@mui/material";
import { useHistory, useRouteMatch } from "react-router-dom";

export default function ({ course }) {
  const { push } = useHistory();
  const { url } = useRouteMatch();
  return (
    <Grid
      item
      onClick={() => push(`${url}/:id`)}
      xs={3}
      sx={{ cursor: "pointer" }}
    >
      <Paper sx={{ p: 2 }}>
        <Stack spacing={3}>
          <Box sx={{ textAlign: "center" }}>
            <img
              width={"40%"}
              style={{ borderRadius: "50%" }}
              src="https://sololearnuploads.azureedge.net/uploads/courses/1141.png"
              alt=""
            />
          </Box>

          <Divider />
          <Typography variant="h6">Web Development Fundamentals</Typography>
        </Stack>
      </Paper>
    </Grid>
  );
}
