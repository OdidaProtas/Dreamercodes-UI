import { Button, LinearProgress, Typography } from "@mui/material";
import CourseCard from "../../../../components/mentor/courseCard";
import CoursesFab from "../../../../components/mentor/coursesFab";
import ErrorComponent from "../../../../components/shared/error";
import LoaderComponent from "../../../../components/shared/loader";
import { useDocTitle, useList } from "../../../../hooks";

export default function () {
  useDocTitle("Students Overview");

  const {
    loading_students: loadingStudents,
    getItemsArray,
    error: studentsError,
  } = useList({
    slug: "students",
    instance: "courses",
  });

  const students = getItemsArray();

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Students
      </Typography>
      {loadingStudents && <LoaderComponent desc="Students" />}
      {studentsError && !Boolean(students.length) && !loadingStudents && (
        <ErrorComponent
          action="Refresh the page to try again, or contact support"
          desc="An error occured while fetching courses"
        />
      )}
      {!Boolean(students.length) && !loadingStudents && (
        <>
          No users found
          <div>
            <Button disableElevation variant="contained">
              Invite
            </Button>
            <Button disableElevation variant="contained" sx={{ ml: 2 }}>
              Add
            </Button>
          </div>
        </>
      )}
      {Boolean(students.length) && <CourseCard />}
      <CoursesFab />
    </>
  );
}
