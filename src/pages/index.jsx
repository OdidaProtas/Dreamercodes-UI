import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { lazy } from "react";
import Navbar from "../components/shared/navbar";
import Navigation from "../features/navigation";

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

const navOptions = [
  { exact: true, children: <LandingPage />, route: "/" },
  { exact: false, children: <AuthPages />, route: "accounts" },
  { exact: false, children: <Portal />, route: "portal" },
  { exact: false, children: <Profile />, route: "profile" },
  { exact: false, children: <Cert />, route: "cert/:id" },
  { exact: false, children: <Mentor />, route: "mentor" },
  { exact: false, children: <Blog />, route: "blog" },
  { exact: true, children: <Courses />, route: "courses" },
  { exact: true, children: <About />, route: "about-us" },
  { exact: true, children: <Community />, route: "community" },
  { exact: false, children: <Rooms  />, route: "rooms" },
  {
    exact: false,
    children: (
      <ThemeProvider theme={theme}>
        <Navbar />
        <Container>
          <Dash />
        </Container>
      </ThemeProvider>
    ),
    route: "dashboard",
  },
  { exact: false, children: <Fourohfour />, route: "*" },
];

export default function () {
  return <Navigation options={navOptions} />;
}
