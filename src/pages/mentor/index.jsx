import { Box, Toolbar, Container } from "@mui/material";
import { useMemo } from "react";
import { lazy } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import Drawer from "../../components/mentor/drawer";
import Navigation from "../../features/navigation";
import { useAuth } from "../../hooks";
import withRoot from "../landingPage/withRoot";

const Overview = lazy(() => import("./overview"));
const Courses = lazy(() => import("./courses"));
const Students = lazy(() => import("./students"));
const Assesmeents = lazy(() => import("./assesments"));
const Settins = lazy(() => import("./subjects"));
const Blog = lazy(() => import("./blog"));
const Apps = lazy(() => import("./apps"));
const NotFoundPage = lazy(() => import("../fourohfour"));

export default withRoot(function () {
  const { url } = useRouteMatch();

  const { checkLoginStatus, checkVerificationStatus } = useAuth();

  const isLoggedIn = checkLoginStatus();
  const isVerified = checkVerificationStatus();

  const navOptions = useMemo(
    () => [
      { exact: true, children: <Overview />, route: "" },
      { exact: false, children: <Courses />, route: "/courses" },
      { exact: false, children: <Students />, route: "/students" },
      { exact: false, children: <Assesmeents />, route: "/assesments" },
      { exact: false, children: <Settins />, route: "/subjects" },
      { exact: false, children: <Blog />, route: "/blog" },
      { exact: false, children: <Apps />, route: "/organizations" },
      { exact: false, children: <NotFoundPage />, route: "**" },
    ],
    []
  );

  if (!isLoggedIn) return <Redirect to={`/accounts?next=${url}`} />;
  // if (!isVerified)
  //   return <Redirect to={`/accounts/email-verification?next=${url}`} />;

  return (
    <Drawer>
      <Navigation options={navOptions} />
    </Drawer>
  );
});
