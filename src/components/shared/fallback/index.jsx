import { Box, CircularProgress, Typography } from "@mui/material";
import PageLoader from "../pageLoader";

export default () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box>
        <PageLoader />
      </Box>
    </Box>
  );
};
