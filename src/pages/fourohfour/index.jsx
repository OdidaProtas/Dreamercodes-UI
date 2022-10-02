import { Box, Button, Paper, Typography, Stack, Divider } from "@mui/material";
import { useHistory } from "react-router-dom";

export default () => {
  const { goBack, push } = useHistory();
  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <Box
        sx={{
          minHeight: "96vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Paper elevation={0} sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Typography variant="h4">Dreamercodes</Typography>
            <Typography variant="h5">Requested resource not found</Typography>
            <Typography variant="h6">
              Please check the resource url and try again.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <Button onClick={() => push("/")} variant="contained">
                Go Home
              </Button>
              <Button onClick={() => push("/portal")}>Visit Portal</Button>
              <Button onClick={goBack}>Go Back</Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};
