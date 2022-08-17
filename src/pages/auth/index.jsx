import { Box, Container, Grid } from "@mui/material";
import { lazy } from "react";
import { useHistory } from "react-router-dom";
import bgImg from "../../assets/defaultBg.png";
import Navigation from "../../features/navigation";

const LoginPage = lazy(() => import("./login"));
const RegistrationPage = lazy(() => import("./registration"));
const PasswordResetPage = lazy(() => import("./passwordReset"));
const EmailConfirmation = lazy(() => import("./confirmEmail"));
const Fourohfour = lazy(() => import("../fourohfour"));

const navOptions = [
  { exact: true, children: <LoginPage />, route: "" },
  { exact: true, children: <RegistrationPage />, route: "/signup" },
  {
    exact: false,
    children: <EmailConfirmation />,
    route: "/email-confirmation",
  },
  { exact: false, children: <PasswordResetPage />, route: "/password-reset" },
  { exact: false, children: <Fourohfour />, route: "*" },
];

export default function () {
  const { push } = useHistory();
  return (
    <Grid container>
      <Grid item xs sx={{ maxHeight: "100vh", overflow: "auto" }}>
        <Container sx={{ mt: { xs: 9 } }}>
          <Navigation options={navOptions} />;
        </Container>
      </Grid>
      <Grid
        item
        xs={1}
        md={6}
        lg={6}
        sx={{
          height: "97vh",
          bgcolor: "azure",
          display: { xs: "none", md: "none", lg: "inline" },
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
          }}
        >
          <img height={"100%"} width="100%" src={bgImg} alt="" />
        </Box>
      </Grid>
    </Grid>
  );
}
