import { lazy } from "react";
import Navigation from "../features/navigation";

const LandingPage = lazy(() => import("./landingPage"));
const AuthPages = lazy(() => import("./auth"));
const Fourohfour = lazy(() => import("./fourohfour"));
const Portal = lazy(() => import("./portal"));
const Profile = lazy(() => import("./profile"));
const Cert = lazy(() => import("./cert"));
const Mentor = lazy(() => import("./mentor"));

const navOptions = [
  { exact: true, children: <LandingPage />, route: "/" },
  { exact: false, children: <AuthPages />, route: "accounts" },
  { exact: false, children: <Portal />, route: "portal" },
  { exact: false, children: <Profile />, route: "profile" },
  { exact: false, children: <Cert />, route: "cert/:id" },
  { exact: false, children: <Mentor />, route: "mentor" },
  { exact: false, children: <Fourohfour />, route: "*" },
];

export default function () {
  return <Navigation options={navOptions} />;
}
