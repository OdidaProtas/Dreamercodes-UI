import { lazy } from "react";
import Navigation from "../../../features/navigation";

const CoursesList = lazy(() => import("./coursesList"));
const CoursesDetails = lazy(() => import("./coursesDetails"));

const navOptions = [
  { exact: true, children: <CoursesList />, route: "" },
  { exact: false, children: <CoursesDetails />, route: "/:id" },
];

export default function () {
  return (
    <>
      <Navigation options={navOptions} />
    </>
  );
}
