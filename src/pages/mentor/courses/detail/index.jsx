import { AddCircle, ArrowBackIos, Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import CourseCard from "../../../../components/mentor/courseCard";
import CoursesFab from "../../../../components/mentor/coursesFab";
import ErrorComponents from "../../../../components/shared/error";
import LoaderComponent from "../../../../components/shared/loader";
import { useDocTitle, useList } from "../../../../hooks";
import useItem from "../../../../hooks/useItem";

export default function CourseDetail() {
  useDocTitle("Course Detail");
  const {
    loading_courses_item: loadingCourse,
    getItem: getCourse,
    error: courseError,
  } = useItem({
    slug: "courses",
    instance: "courses",
  });

  const course = getCourse();

  const { id } = useParams();

  const { push, goBack } = useHistory();

  const { getItemsArray: getSubjects } = useList({
    instance: "courses",
    slug: "subjects",
  });

  const subjects = getSubjects();

  const handleClick = (id) => {
    push(`/mentor/subjects/${id}`);
  };

  return (
    <Box
      sx={{
        // backgroundImage: `url(${course?.bannerUrl})`,
        borderRadius: "4px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        p: 2,
        minHeight: "80vh",
        overflow: "hidden",
      }}
    >
      <Grid container spacing={3}>
        <Grid sx={{ backdropFilter: "blur(100px)" }} item xs={9}>
          {loadingCourse && <LoaderComponent desc="Course" />}
          {courseError && !Boolean(course) && (
            <ErrorComponents
              desc="An error occured loading course"
              action="Refresh page to try again, or contact support if problem persists"
            />
          )}

          {Boolean(course) && (
            <Box>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ display: "flex", gap: 2, flexGrow: 1 }}>
                  <Avatar
                    sx={{ width: 39, height: 39 }}
                    src={course?.imageUrl}
                  />
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h6">{course?.title} </Typography>
                  </Box>
                </Box>
                <Box>
                  <Button
                    startIcon={<Edit />}
                    onClick={() =>
                      push(`/mentor/courses/new?mode=edit&item_id=${id}`)
                    }
                    variant="outlined"
                  >
                    Edit
                  </Button>
                  <Button
                    startIcon={<ArrowBackIos />}
                    onClick={goBack}
                    sx={{ ml: 2 }}
                    disableElevation
                    variant="contained"
                  >
                    Go back
                  </Button>
                </Box>
              </Box>
              <Divider sx={{ my: 1 }} />
              {Boolean(course.description) && (
                <Box sx={{ maxHeight: "55vh", overflow: "auto", p: 2 }}>
                  <Typography variant="h6">
                    <span
                      dangerouslySetInnerHTML={{ __html: course.description }}
                    ></span>
                  </Typography>
                </Box>
              )}

              <Box sx={{ mt: 6, textAlign: "center", mb: 3 }}>
                {!Boolean(subjects.length) && (
                  <>No subjects found for this course</>
                )}
              </Box>
              <></>
            </Box>
          )}
        </Grid>
        <Grid
          item
          xs
          sx={{
            backdropFilter: "blur(69px)",
            maxHeight: "100vh",
            height: "66vh",
            overflow: "auto",
            pr: 2,
          }}
        >
          <Stack spacing={3}>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                <Typography sx={{}} variant="h6">
                  Subjects
                </Typography>
              </Box>
              <IconButton
                onClick={() => push(`/mentor/subjects/new?id=${id}`)}
                variant="contained"
              >
                <AddCircle />
              </IconButton>
            </Box>
            {subjects.map((subject) => {
              return (
                <Box>
                  <CourseCard
                    textOnly
                    handleClick={handleClick}
                    course={subject}
                  />
                </Box>
              );
            })}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
