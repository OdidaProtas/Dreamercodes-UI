import { lazy } from "react";
import Navigation from "../../../features/navigation";
import { useDocTitle } from "../../../hooks";

const Home = lazy(() => import("./overview"));
const Detail = lazy(() => import("./detail"));
const Form = lazy(() => import("./add"));
const List = lazy(() => import("./list"));
const PageNotFound = lazy(() => import("../../fourohfour"));

const navOptions = [
  { exact: true, children: <Home />, route: "" },
  { exact: true, children: <Form />, route: "/new" },
  { exact: true, children: <List />, route: "/list" },
  { exact: true, children: <Detail />, route: "/:id" },
  { exact: true, children: <Form />, route: "/:id/edit" },
  { exact: false, children: <PageNotFound />, route: "**" },
];

export default function () {
  useDocTitle("Subjects");
  return (
    <>
      <Navigation options={navOptions} />
    </>
  );
}
