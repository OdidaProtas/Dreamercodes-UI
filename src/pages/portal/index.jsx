import { Box, Toolbar, Typography } from "@mui/material";
import { Redirect } from "react-router-dom";
import Navbar from "../../components/shared/navbar";
import { useAuth } from "../../hooks/useAuth";

export default () => {
  const { checkLoginStatus } = useAuth();
  const isLoggedIn = checkLoginStatus();

  if (!isLoggedIn) return <Redirect to="/accounts" />;
  
  return (
    <>
      <Navbar />
      <Toolbar />
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 6,
            justifyContent: "center",
          }}
        >
          <Typography variant="h5">Welcome back user!</Typography>
        </Box>
      </Box>
    </>
  );
};
