import { LinearProgress, Typography } from "@mui/material";
import CoursesFab from "../../../../components/mentor/coursesFab";
import ErrorComponents from "../../../../components/shared/error";
import { useDocTitle } from "../../../../hooks";
import useItem from "../../../../hooks/useItem";

export default function () {
  useDocTitle("Course Detail");
  const {
    loading_courses_item: loadingCourse,
    getItem: getCourse,
    error: courseError,
  } = useItem({
    slug: "courses",
    instance: "courses",
  });

  return (
    <>
      <Typography variant="h4">Course detail</Typography>
      {loadingCourse && <LinearProgress />}
      {courseError && (
        <ErrorComponents
          desc="An error occured loading course"
          action="Refresh page to try again, or contact support if problem persists"
        />
      )}
      <CoursesFab edit />
    </>
  );
}
