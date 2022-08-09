import { lazy } from "react";
import Navigation from "../../../features/navigation";

const EmailForm = lazy(() => import("./emailForm"));
const Fourohfour = lazy(() => import("../../fourohfour"));
const NewPasswordForm = lazy(() => import("./newPasswordForm"));
const SuccessAlert = lazy(() => import("./resetSuccess"));
const ConfirmForm = lazy(() => import("./confirmForm"));

const navOptions = [
  { exact: true, children: <EmailForm />, route: "" },
  { exact: true, children: <ConfirmForm />, route: "/email-sent" },
  { exact: true, children: <NewPasswordForm />, route: "/new-password" },
  { exact: true, children: <SuccessAlert />, route: "/success" },
  { exact: true, children: <Fourohfour />, route: "*" },
];

export default () => {
  return <Navigation options={navOptions} />;
};
