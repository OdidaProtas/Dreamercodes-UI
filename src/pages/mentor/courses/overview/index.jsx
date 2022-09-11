import { LinearProgress, Typography } from "@mui/material";
import CourseCard from "../../../../components/mentor/courseCard";
import CoursesFab from "../../../../components/mentor/coursesFab";
import ErrorComponent from "../../../../components/shared/error";
import LoaderComponent from "../../../../components/shared/loader";
import { useDocTitle, useList } from "../../../../hooks";

export default function () {
  useDocTitle("Courses Overview");

  const {
    loading_courses: loadingCourses,
    getItemsArray,
    error: coursesError,
  } = useList({
    slug: "courses",
    instance: "courses",
  });

  const courses = getItemsArray();

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Courses
      </Typography>
      {loadingCourses && <LoaderComponent desc="Courses" />}
      {coursesError && !Boolean(courses.length) && !loadingCourses && (
        <ErrorComponent
          action="Refresh the page to try again, or contact support"
          desc="An error occured while fetching courses"
        />
      )}
      {Boolean(courses.length) && <CourseCard />}
      <CoursesFab />
    </>
  );
}
