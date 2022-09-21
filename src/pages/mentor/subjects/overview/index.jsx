import { Grid, Typography } from "@mui/material";
import CourseCard from "../../../../components/mentor/courseCard";
import CoursesFab from "../../../../components/mentor/coursesFab";
import ErrorComponent from "../../../../components/shared/error";
import LoaderComponent from "../../../../components/shared/loader";
import { useDocTitle, useList } from "../../../../hooks";

export default function () {
  useDocTitle("Subjects Overview");

  const {
    loading_subjects: loadingSubjects,
    getItemsArray,
    error: subjectsError,
  } = useList({
    slug: "subjects",
    instance: "courses",
  });

  const subjects = getItemsArray();

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Subjects
      </Typography>
      {loadingSubjects && <LoaderComponent desc="Subjects" />}
      {subjectsError && !Boolean(subjects.length) && !loadingSubjects && (
        <ErrorComponent
          action="Refresh the page to try again, or contact support"
          desc="An error occured while fetching courses"
        />
      )}
      {Boolean(subjects.length) && (
        <Grid container spacing={2}>
          {subjects.map((subject) => {
            return (
              <Grid key={subject.id} item xs={4}>
                <CourseCard course={subject} />
              </Grid>
            );
          })}
        </Grid>
      )}
      <CoursesFab />
    </>
  );
}
