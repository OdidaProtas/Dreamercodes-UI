import { Box, Toolbar, Container } from "@mui/material";
import { lazy } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import Drawer from "../../components/mentor/drawer";
import Navigation from "../../features/navigation";
import { useAuth } from "../../hooks";

const Overview = lazy(() => import("./overview"));
const Courses = lazy(() => import("./courses"));
const Students = lazy(() => import("./students"));
const Assesmeents = lazy(() => import("./assesments"));
const Settins = lazy(() => import("./subjects"));
const NotFoundPage = lazy(() => import("../fourohfour"));

const navOptions = [
  { exact: true, children: <Overview />, route: "" },
  { exact: false, children: <Courses />, route: "/courses" },
  { exact: true, children: <Students />, route: "/students" },
  { exact: true, children: <Assesmeents />, route: "/assesments" },
  { exact: true, children: <Settins />, route: "/subjects" },
  { exact: false, children: <NotFoundPage />, route: "**" },
];

export default function () {
  const { url } = useRouteMatch();

  const { checkLoginStatus, checkVerificationStatus } = useAuth();

  const isLoggedIn = checkLoginStatus();
  const isVerified = checkVerificationStatus();

  if (!isLoggedIn) return <Redirect to={`/accounts?next=${url}`} />;
  // if (!isVerified)
  //   return <Redirect to={`/accounts/email-verification?next=${url}`} />;

  return (
    <Container>
      <Drawer>
        <Navigation options={navOptions} />
      </Drawer>
    </Container>
  );
}
