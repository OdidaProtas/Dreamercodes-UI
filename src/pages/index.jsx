import { lazy } from "react";
import Navigation from "../features/navigation";

const LandingPage = lazy(() => import("./landingPage"));
const AuthPages = lazy(() => import("./auth"));
const Fourohfour = lazy(() => import("./fourohfour"));
const Portal = lazy(() => import("./portal"));

const navOptions = [
  { exact: true, children: <LandingPage />, route: "/" },
  { exact: false, children: <AuthPages />, route: "accounts" },
  { exact: false, children: <Portal />, route: "portal" },
  { exact: false, children: <Fourohfour />, route: "*" },
];

export default function () {
  return <Navigation options={navOptions} />;
}
