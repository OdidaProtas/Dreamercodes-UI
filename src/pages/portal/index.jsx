import { Toolbar } from "@mui/material";
import { lazy } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import Navbar from "../../components/shared/navbar";
import Navigation from "../../features/navigation";
import { useAuth } from "../../hooks/useAuth";
import Fourohfour from "../fourohfour";

const OnboardingPage = lazy(() => import("./onboarding"));
const HomePage = lazy(() => import("./home"));
const LearningPage = lazy(() => import("./learning"));

const navOptions = [
  { exact: true, children: <HomePage />, route: "" },
  { exact: false, children: <OnboardingPage />, route: "/onboarding" },
  { exact: false, children: <LearningPage />, route: "/learning" },
  { exact: false, children: <Fourohfour />, route: "*" },
];

export default () => {
  const { checkLoginStatus, checkVerificationStatus } = useAuth();
  const isLoggedIn = checkLoginStatus();
  const isVerified = checkVerificationStatus();

  const { url } = useRouteMatch();

  if (!isLoggedIn) return <Redirect to={`/accounts?next=${url}`} />;

  if (!isVerified)
    return <Redirect to={`/accounts/email-verification?next=${url}`} />;

  return (
    <>
      <Navbar />
      <Toolbar />
      <Navigation options={navOptions} />
    </>
  );
};
