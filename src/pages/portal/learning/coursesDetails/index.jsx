import { lazy } from "react";
import Navigation from "../../../../features/navigation";

const Overview = lazy(() => import("./overview"));
const Lesson = lazy(() => import("./lesson"));
const Practice = lazy(() => import("./practice"));
const NotFoundPage = lazy(() => import("../../../fourohfour"));

const navOptions = [
  { exact: true, children: <Overview />, route: "" },
  { exact: true, children: <Lesson />, route: "/:lesson_id/:task_id" },
  { exact: true, children: <Practice />, route: "/:lesson_id/:task_id/practice" },
  { exact: false, children: <NotFoundPage />, route: "*" },
];

export default function () {
  return (
    <>
      <Navigation options={navOptions} />
    </>
  );
}
