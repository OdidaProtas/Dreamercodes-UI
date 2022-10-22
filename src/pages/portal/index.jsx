import { Box, Toolbar } from "@mui/material";
import { lazy } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import LoaderComponent from "../../components/shared/loader";
import Navbar from "../../components/shared/navbar";
import Navigation from "../../features/navigation";
import { useAuth } from "../../hooks";
import Fourohfour from "../fourohfour";
import withRoot from "../landingPage/withRoot";

import useOnboardingProfile from "./onboarding/hooks/useOnboardingProfile";

const OnboardingPage = lazy(() => import("./onboarding"));
const HomePage = lazy(() => import("./home"));
const LearningPage = lazy(() => import("./learning"));

const navOptions = [
  { exact: true, children: <HomePage />, route: "" },
  { exact: false, children: <OnboardingPage />, route: "/onboarding" },
  { exact: false, children: <LearningPage />, route: "/learning" },
  { exact: false, children: <Fourohfour />, route: "*" },
];

export default withRoot(() => {
  const { checkVerificationStatus } = useAuth();

  const isVerified = checkVerificationStatus();

  const { url } = useRouteMatch();

  const { loading } = useOnboardingProfile();

  if (!isVerified)
    return <Redirect to={`/accounts/email-verification?next=${url}`} />;

  if (loading) {
    return (
      <Box sx={{ my: 12, pl: 7 }}>
        <LoaderComponent desc="Your Profile" />
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Toolbar />
      <Navigation options={navOptions} />
    </>
  );
});
