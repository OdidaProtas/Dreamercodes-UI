import { lazy } from "react";
import Navigation from "../../../features/navigation";
import { useDocTitle } from "../../../hooks";

const Home = lazy(() => import("./overview"));
const Detail = lazy(() => import("./detail"));
const Form = lazy(() => import("./add"));
const LessonForm = lazy(() => import("./topic/form/lessonForm"));
const SubtopicForm = lazy(() => import("./topic/form/subtopicForm"));
const List = lazy(() => import("./list"));
const Topic = lazy(() => import("./topic"));
const TopicDetail = lazy(() => import("./detail/topicDetail"));
const PageNotFound = lazy(() => import("../../fourohfour"));

const navOptions = [
  { exact: true, children: <Home />, route: "" },
  { exact: true, children: <Form />, route: "/new" },
  { exact: true, children: <List />, route: "/list" },
  { exact: false, children: <List />, route: "/task/:id" },
  { exact: false, children: <Topic />, route: "/:id/topic" },
  { exact: true, children: <Form />, route: "/:id/edit" },
  { exact: true, children: <LessonForm />, route: "/:id/:topic/lesson/new" },
  {
    exact: true,
    children: <SubtopicForm />,
    route: "/:id/:topic/sub-topic/new",
  },
  { exact: true, children: <TopicDetail />, route: "/:id/:topic" },
  { exact: true, children: <Detail />, route: "/:id" },
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
