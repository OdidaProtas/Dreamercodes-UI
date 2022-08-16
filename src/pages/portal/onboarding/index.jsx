import { lazy } from "react";
import Navigation from "../../../features/navigation";
import FourOurFour from "../../../pages/fourohfour";

const SurveyCourses = lazy(() => import("./surveyCourses"));
const CoursesSelection = lazy(() => import("./coursesSelection"));
const Motivational = lazy(() => import("./motivational"));
const Availability = lazy(() => import("./availability"));
const Pace = lazy(() => import("./pace"));
const Categories = lazy(() => import("./categories"));
const LearningPlan = lazy(() => import("./learningPlan"));
const Welcome = lazy(() => import("./welome"));
const Payment = lazy(() => import("./payment"));
const QuestionExperience = lazy(() => import("./questionExperience"));

const navOptions = [
  { exact: true, children: <SurveyCourses />, route: "" },
  { exact: true, children: <CoursesSelection />, route: "/select-courses" },
  { exact: true, children: <Motivational />, route: "/motivational" },
  { exact: true, children: <QuestionExperience />, route: "/experience" },
  { exact: true, children: <Availability />, route: "/availability" },
  { exact: true, children: <Pace />, route: "/pace" },
  { exact: true, children: <Categories />, route: "/categories" },
  { exact: true, children: <Welcome />, route: "/welcome" },
  { exact: true, children: <Payment />, route: "/payment" },
  { exact: true, children: <LearningPlan />, route: "/learning-plan" },
  { exact: false, children: <FourOurFour />, route: "*" },
];

export default () => {
  return <Navigation options={navOptions} />;
};
