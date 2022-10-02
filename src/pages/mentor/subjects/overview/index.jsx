import { AddCircleRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useHistory } from "react-router-dom";
import CourseCard from "../../../../components/mentor/courseCard";
import CoursesFab from "../../../../components/mentor/coursesFab";
import ErrorComponent from "../../../../components/shared/error";
import LoaderComponent from "../../../../components/shared/loader";
import { useDocTitle, useList } from "../../../../hooks";

export default function SubjectsOverview() {
  useDocTitle("Subjects Overview");

  const {
    loading_subjects: loadingSubjects,
    getItemsArray: getSubjects,
    error: subjectsError,
  } = useList({
    slug: "subjects",
    instance: "courses",
  });

  const {
    loading_courses: loadingCourses,
    getItemsArray: getCourses,
    error: coursesError,
  } = useList({
    slug: "courses",
    instance: "courses",
  });

  const subjects = getSubjects();
  const courses = getCourses();

  const { push } = useHistory();

  return (
    <Grid
      container
      spacing={2}
      sx={{
        minHeight: "85vh",
        bgcolor: "background.newWhite",
        borderRadius: "4px",
      }}
    >
      <Grid item xs={9} sx={{ maxHeight: "69vh" }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: "1" }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              {loadingCourses ? <CircularProgress /> : subjects.length} Subjects
            </Typography>
          </Box>
          <Box>
            <Button
              onClick={() => push("/mentor/subjects/new")}
              disableElevation
              variant="contained"
            >
              Add Subject
            </Button>
          </Box>
        </Box>
        <Divider sx={{ mb: 1 }} />
        {loadingSubjects && <LoaderComponent desc="Subjects" />}
        {subjectsError && !Boolean(subjects.length) && !loadingSubjects && (
          <ErrorComponent
            action="Refresh the page to try again, or contact support"
            desc="An error occured while fetching courses"
          />
        )}
        {Boolean(subjects.length) && (
          <Grid container spacing={2}>
            {subjects.filter(Boolean).map((subject) => {
              return (
                <Grid key={subject.id} item xs={4}>
                  <CourseCard course={subject} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Grid>
      <Grid
        item
        xs
        sx={{
          bgcolor: "#eaf1fb",
          p: 1,
          ml: 2,
          maxHeight: "84vh",
          overflow: "auto",
        }}
      >
        <Stack spacing={2}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: "1", display: "flex", alignItems: "center" }}>
              <Typography variant="h6">
                {" "}
                {loadingCourses ? (
                  <CircularProgress size={20} />
                ) : (
                  courses.length
                )}{" "}
                Courses
              </Typography>
            </Box>
            <Box>
              <IconButton onClick={() => push("/mentor/courses/new")}>
                <AddCircleRounded />
              </IconButton>
            </Box>
          </Box>
          {loadingCourses && (
            <Box sx={{ textAlign: "center", pt: 6 }}>
              <Box>
                <CircularProgress />
              </Box>
            </Box>
          )}
          {courses.filter(Boolean).map((subject) => {
            return (
              <Box key={subject.id}>
                <CourseCard
                  handleClick={() => push(`/mentor/courses/${subject.id}`)}
                  textOnly
                  course={subject}
                />
              </Box>
            );
          })}
        </Stack>
      </Grid>
    </Grid>
  );
}
