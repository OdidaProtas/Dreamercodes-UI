import { Toolbar } from "@mui/material";
import { lazy } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import Navbar from "../../components/shared/navbar";
import Navigation from "../../features/navigation";
import { useAuth } from "../../hooks/useAuth";
import Fourohfour from "../fourohfour";

const OnboardingPage = lazy(() => import("./onboarding"));
const HomePage = lazy(() => import("./home"));

const navOptions = [
  { exact: true, children: <HomePage />, route: "" },
  { exact: false, children: <OnboardingPage />, route: "/onboarding" },
  { exact: false, children: <Fourohfour />, route: "*" },
];

export default () => {
  const { checkLoginStatus } = useAuth();
  const isLoggedIn = checkLoginStatus();

  const { url } = useRouteMatch();

  if (!isLoggedIn) return <Redirect to={`/accounts?next=${url}`} />;

  return (
    <>
      <Navbar />
      <Toolbar />
      <Navigation options={navOptions} />
    </>
  );
};
