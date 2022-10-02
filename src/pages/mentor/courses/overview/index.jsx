import "./styles.css";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Link,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import CourseCard from "../../../../components/mentor/courseCard";
import ErrorComponent from "../../../../components/shared/error";
import LoaderComponent from "../../../../components/shared/loader";
import { useDocTitle, useList } from "../../../../hooks";
import AddCourseCategory from "../../../../components/dialogs/addCourseCategory";
import { Add } from "@mui/icons-material";
import { useHistory } from "react-router-dom";

export default function CoursesOverview() {
  useDocTitle("Courses Overview");

  const {
    loading_courses: loadingCourses,
    getItemsArray,
    error: coursesError,
  } = useList({
    slug: "courses",
    instance: "courses",
  });

  const {
    loading_courses_categories: loadingCoursesCategory,
    getItemsArray: getCoursesCategory,
    error: coursesCategoriesError,
  } = useList({
    slug: "courses_categories",
    instance: "courses",
  });

  const courses = getItemsArray().filter(Boolean);
  const coursesCategories = getCoursesCategory();

  const nodeRef = useRef(null);

  const { push, goBack } = useHistory();

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Courses
                </Typography>
              </Box>
              <Box>
                <Button
                  startIcon={<Add />}
                  disableElevation
                  variant="contained"
                  onClick={() => push("/mentor/courses/new")}
                >
                  Add Course
                </Button>
              </Box>
            </Box>
            {loadingCourses && <LoaderComponent desc="Courses" />}
            {coursesError && !Boolean(courses.length) && !loadingCourses && (
              <ErrorComponent
                action="Refresh the page to try again, or contact support"
                desc="An error occured while fetching courses"
              />
            )}
            <Box>
              {Boolean(courses.length) && (
                <Grid container spacing={2}>
                  {courses.map((course) => {
                    return (
                      <Grid key={course.id} item xs={4}>
                        <CourseCard imgHeight={"72"} course={course} />
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            </Box>
            <Box>
              {!Boolean(courses.length) && !loadingCourses && (
                <>
                  No courses found
                  <Button disableElevation variant="contained" sx={{ ml: 2 }}>
                    Add
                  </Button>{" "}
                </>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{ p: 2, ml: 3, bgcolor: "background.newWhite" }}
            elevation={0}
            component={Paper}
          >
            <CSSTransition
              nodeRef={nodeRef}
              unmountOnExit
              classNames="categories"
              in={true}
              timeout={800}
            >
              <Box ref={nodeRef}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Box
                    sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
                  >
                    <Typography variant="h6">Categories</Typography>
                  </Box>
                  <Box>
                    <AddCourseCategory icon />
                  </Box>
                </Box>

                <Divider />

                {loadingCoursesCategory && (
                  <>
                    <Box sx={{ textAlign: "center", my: 8 }}>
                      <CircularProgress />
                    </Box>
                  </>
                )}

                <Box sx={{ my: 9, textAlign: "center" }}>
                  {!loadingCoursesCategory && coursesCategoriesError && (
                    <>
                      <small>
                        An error occured loading categories. Refresh page to try
                        again or contact support
                      </small>
                    </>
                  )}

                  {!Boolean(coursesCategories.length) &&
                    !coursesCategoriesError &&
                    !loadingCoursesCategory && (
                      <small>category list empty</small>
                    )}
                </Box>
                {Boolean(coursesCategories.length) &&
                  !coursesCategoriesError &&
                  !loadingCoursesCategory && (
                    <>
                      {coursesCategories.map((cat) => {
                        return (
                          <div>
                            <Link>{cat.title}</Link>
                          </div>
                        );
                      })}
                    </>
                  )}
              </Box>
            </CSSTransition>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
