import { Box, Container, Grid, Typography } from "@mui/material";
import { lazy } from "react";
import { useHistory } from "react-router-dom";
import bgImg from "../../assets/defaultBg.png";
import Navigation from "../../features/navigation";
import useOrg from "../../hooks/useOrg";
import withRoot from "../landingPage/withRoot";
import AuthOrgCarousel from "./carousel";

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
    route: "/email-verification",
  },
  { exact: false, children: <PasswordResetPage />, route: "/password-reset" },
  { exact: false, children: <Fourohfour />, route: "*" },
];

function Auth() {
  const { push } = useHistory();
  const [organization, loadingOrg] = useOrg();
  return (
    <Grid container>
      <Grid item xs sx={{ maxHeight: "100vh", overflow: "auto" }}>
        <Container sx={{ mt: { xs: 9 } }}>
          <Navigation options={navOptions} />
        </Container>
      </Grid>
      <Grid
        item
        xs={1}
        md={6}
        lg={6}
        sx={{
          height: "97vh",
          bgcolor: "#eaf1fb",
          display: { xs: "none", md: "none", lg: "inline" },
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
          }}
        >
          {Boolean(organization) && <AuthOrgCarousel bgImg={bgImg} />}
          {Boolean(organization) && (
            <Box sx={{ p: 1 }}>
              <Typography>Organization: {organization?.name}</Typography>
              <Typography>Site id: {organization?.name}</Typography>
            </Box>
          )}
          {!Boolean(organization) && (
            <img height={"100%"} width="100%" src={bgImg} alt="" />
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default withRoot(Auth);
