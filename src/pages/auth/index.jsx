import { Box, Grid } from "@mui/material";
import { lazy } from "react";
import { useHistory } from "react-router-dom";
import bgImg from "../../assets/defaultBg.png";
import Navigation from "../../features/navigation";

const LoginPage = lazy(() => import("./login"));
const RegistrationPage = lazy(() => import("./registration"));
const PasswordResetPage = lazy(() => import("./passwordReset"));
const Fourohfour = lazy(() => import("../fourohfour"));

const navOptions = [
  { exact: true, children: <LoginPage />, route: "" },
  { exact: true, children: <RegistrationPage />, route: "/signup" },
  { exact: false, children: <PasswordResetPage />, route: "/password-reset" },
  { exact: false, children: <Fourohfour />, route: "*" },
];

export default function () {
  const { push } = useHistory();
  return (
    <Grid container>
      <Grid
        item
        xs={11}
        md={6}
        lg={6}
        sx={{ maxHeight: "100vh", overflow: "auto" }}
      >
        <Navigation options={navOptions} />;
      </Grid>
      <Grid item xs={1} md={6} lg={6} sx={{ height: "97vh", bgcolor: "azure" }}>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: { xs: "none", md: "none", lg: "block" },
          }}
        >
          <img height={"100%"} width="100%" src={bgImg} alt="" />
        </Box>
      </Grid>
    </Grid>
  );
}
