import { lazy } from "react";
import { useMemo } from "react";
import Navigation from "../../../../features/navigation";

const Form = lazy(() => import("./form"));
const LessonForm = lazy(() => import("./form/lessonForm"));

export default function () {
  const navOptions = useMemo(() => {
    return [
      { exact: true, children: <Form />, route: "/new" },
      { exact: true, children: <LessonForm />, route: "/lesson/new" },
    ];
  }, []);
  return (
    <>
      <Navigation options={navOptions} />
    </>
  );
}
