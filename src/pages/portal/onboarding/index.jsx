import { lazy } from "react";
import Navigation from "../../../features/navigation";
import FourOurFour from "../../../pages/fourohfour";

const SurveyCourses = lazy(() => import("./surveyCourses"));
const CoursesSelection = lazy(() => import("./coursesSelection"));
const Motivational = lazy(() => import("./motivational"));
const Availability = lazy(() => import("./availability"));
const Pace = lazy(() => import("./pace"));
const Welcome = lazy(() => import("./welome"));
const QuestionExperience = lazy(() => import("./questionExperience"));

const navOptions = [
  { exact: true, children: <SurveyCourses />, route: "" },
  { exact: true, children: <CoursesSelection />, route: "/select-courses" },
  { exact: true, children: <Motivational />, route: "/motivational" },
  { exact: true, children: <QuestionExperience />, route: "/experience" },
  { exact: true, children: <Availability />, route: "/availability" },
  { exact: true, children: <Pace />, route: "/pace" },
  { exact: true, children: <Welcome />, route: "/welcome" },
  { exact: false, children: <FourOurFour />, route: "*" },
];

export default () => {
  return <Navigation options={navOptions} />;
};
