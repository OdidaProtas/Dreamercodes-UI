import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { useMemo } from "react";
import { lazy } from "react";
import Navbar from "../components/shared/navbar";
import { data } from "../data";
import Navigation from "../features/navigation";
import security from "../security";
import { ssrFbs } from "../ssr/pages";

import theme from "./landingPage/theme";

const LandingPage = lazy(() => import("./landingPage"));
const AuthPages = lazy(() => import("./auth"));
const Fourohfour = lazy(() => import("./fourohfour"));
const Portal = lazy(() => import("./portal"));
const Profile = lazy(() => import("./profile"));
const Cert = lazy(() => import("./cert"));
const Mentor = lazy(() => import("./mentor"));
const Blog = lazy(() => import("./blog"));
const Courses = lazy(() => import("./courses"));
const About = lazy(() => import("./about"));
const Community = lazy(() => import("./community"));
const Dash = lazy(() => import("../pages/mentor/apps"));
const Rooms = lazy(() => import("./rooms"));

export default function Pages() {
  const navOptions = useMemo(
    () => [
      {
        exact: true,
        children: <LandingPage />,
        route: "/",
        ssr: ssrFbs.landigPage(),
      },
      { exact: false, children: <AuthPages />, route: "accounts" },
      {
        exact: false,
        children: <Portal />,
        route: "portal",
        secure: security.pages.portal,
      },
      {
        exact: false,
        children: <Profile />,
        route: "profile",
        secure: security.pages.profile,
      },
      { exact: false, children: <Cert />, route: "cert/:id" },
      {
        exact: false,
        children: <Mentor />,
        route: "mentor",
        secure: security.pages.mentor,
      },
      {
        exact: true,
        children: <Courses />,
        route: "courses",
        prefetch: data.list.courses,
        ssr: ssrFbs.courses(),
      },
      { exact: true, children: <About />, route: "about-us" },
      { exact: true, children: <Community />, route: "community" },
      {
        exact: false,
        children: <Rooms />,
        route: "rooms",
        secure: security.pages.rooms,
      },
      {
        exact: false,
        children: wrappedDash,
        route: "dashboard",
        secure: security.pages.dashboard,
      },
      { exact: false, children: <Blog />, route: "blog" },
      { exact: false, children: <Fourohfour />, route: "*" },
    ],
    []
  );
  return <Navigation options={navOptions} />;
}

var wrappedDash = (
  <ThemeProvider theme={theme}>
    <Navbar />
    <Container>
      <Dash />
    </Container>
  </ThemeProvider>
);
