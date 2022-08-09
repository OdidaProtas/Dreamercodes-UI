import { Box, CircularProgress, Typography } from "@mui/material";

export default () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign:"center"
      }}
    >
      <Box>
        <CircularProgress />
        <Typography>Loading requested resource...</Typography>
      </Box>
    </Box>
  );
};
