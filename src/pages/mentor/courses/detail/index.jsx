import {
  Avatar,
  Box,
  Button,
  Divider,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import CoursesFab from "../../../../components/mentor/coursesFab";
import ErrorComponents from "../../../../components/shared/error";
import LoaderComponent from "../../../../components/shared/loader";
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

  const course = getCourse();
  const subjects = [];

  const { id } = useParams();

  const { push } = useHistory();

  return (
    <>
      <Typography variant="h4">Course detail</Typography>
      {loadingCourse && <LoaderComponent desc="Course" />}
      {courseError && !Boolean(course) && (
        <ErrorComponents
          desc="An error occured loading course"
          action="Refresh page to try again, or contact support if problem persists"
        />
      )}
      {Boolean(course?.id) && (
        <>
          <img height={240} width="100%" src={course.bannerUrl} alt="" />
        </>
      )}

      {Boolean(course) && (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Avatar sx={{ width: 60, height: 60 }} src={course?.imageUrl} />
            <Box>
              <Typography variant="h5">
                <span>{course?.title}</span>{" "}
              </Typography>
              {Boolean(course.description) && (
                <Typography variant="h6">
                  <span
                    dangerouslySetInnerHTML={{ __html: course.description }}
                  ></span>
                </Typography>
              )}
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ flexGrow: 1 }} variant="h6">
              Subjects
            </Typography>
            <Button
              disableElevation
              onClick={() => push(`/mentor/subjects/new?id=${id}`)}
              variant="contained"
            >
              Add Subject
            </Button>
          </Box>
          <Box sx={{ mt: 6, textAlign: "center", mb: 3 }}>
            {Boolean(!subjects.length) && (
              <>No subjects found for this course</>
            )}
          </Box>
        </Box>
      )}
      <CoursesFab edit />
    </>
  );
}
