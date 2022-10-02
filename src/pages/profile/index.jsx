import { ContactSupport } from "@mui/icons-material";
import { Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { lazy } from "react";
import {
  Redirect,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import CertGrid from "../../components/certifications/certGrid";
import Navbar from "../../components/shared/navbar";
import Navigation from "../../features/navigation";
import { useAuth } from "../../hooks";
import Fourohfour from "../fourohfour";

const Overview = lazy(() => import("./overview"));
const Update = lazy(() => import("./update"));
const Certifications = lazy(() => import("./certifications"));

import withRoot from "../landingPage/withRoot";

const navigationOptions = [
  { exact: true, children: <Overview />, route: "" },
  { exact: true, children: <Update />, route: "/update" },
  { exact: true, children: <Certifications />, route: "/cert/:id" },
  { exact: false, children: <Fourohfour />, route: "*" },
];

export default withRoot(() => {
  const { url } = useRouteMatch();
  const { push } = useHistory();

  const { pathname } = useLocation();

  const isCert = /\/cert/.test(pathname);
  const isUpdate = /\/update/.test(pathname);

  const { checkLoginStatus, logout, checkVerificationStatus } = useAuth();

  const isLoggedIn = checkLoginStatus();
  const isVerified = checkVerificationStatus();

  const handleLogout = () => {
    logout();
    push("/accounts");
  };

  if (!isLoggedIn) return <Redirect to={`/accounts?next=${url}`} />;
  if (!isVerified)
    return <Redirect to={`/accounts/email-verification?next=${url}`} />;

  return (
    <Container>
      <Navbar />
      <Toolbar />
      <Navigation options={navigationOptions} />
      {!isCert && !isUpdate && (
        <>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5"> My Certifications</Typography>
            <CertGrid />
          </Box>
        </>
      )}
    </Container>
  );
});
