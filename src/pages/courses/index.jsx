import { Box, Grid } from "@mui/material";
import CourseCard from "../../components/mentor/courseCard";
import ErrorComponents from "../../components/shared/error";
import LoaderComponent from "../../components/shared/loader";
import { useDocTitle, useList } from "../../hooks";
import AppAppBar from "../landingPage/AppAppBar";
import AppFooter from "../landingPage/AppFooter";
import ProductHero from "../landingPage/ProductHero";
import withRoot from "../landingPage/withRoot";

function Courses() {
  useDocTitle("Courses");

  const {
    loading_courses: LoadingCourses,
    error: coursesError,
    getItemsArray,
  } = useList({
    instance: "courses",
    slug: "courses",
  });

  const courses = getItemsArray().filter(Boolean);

  return (
    <Box sx={{ bgcolor: coursesError ? "lightgray" : "hsl(210, 46%, 95%)" }}>
      <AppAppBar />
      <ProductHero courses />
      {LoadingCourses && (
        <Box sx={{ ml: "100px" }}>
          <LoaderComponent desc="Courses" />
        </Box>
      )}

      {!LoadingCourses && coursesError && (
        <Box sx={{ ml: "90px", my: 9 }}>
          <ErrorComponents
            action="Check your network and reload this page, or contact support for help"
            desc="An error occured while fetching courses"
          />
        </Box>
      )}
      {Boolean(courses.length) && (
        <Grid sx={{ p: 9 }} container spacing={2}>
          {courses.map((course) => {
            return (
              <Grid item xs={4} key={course.id}>
                <CourseCard course={course} key={courses} />
              </Grid>
            );
          })}
        </Grid>
      )}

      <Box sx={{ my: 9, textAlign: "center" }}>
        {!Boolean(courses.length) && !LoadingCourses && <>No courses found</>}
      </Box>
      <Box sx={{ mt: 12 }}>
        <AppFooter />
      </Box>
    </Box>
  );
}

export default withRoot(Courses);
