import { ArrowBackIos } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useHistory, useRouteMatch } from "react-router-dom";
import Accord from "../../../../../components/courses/accord";
import CourseCard from "../../../../../components/mentor/courseCard";
import { useItem, useList } from "../../../../../hooks";

export default function () {
  const { goBack } = useHistory();
  const { getItem: getCourse } = useItem({
    instance: "courses",
    slug: "courses",
  });

  const { getItemsArray: getSubjects } = useList({
    instance: "courses",
    slug: "subjects",
  });

  const course = getCourse();
  const subjects = getSubjects();

  const { url } = useRouteMatch();
  const { push } = useHistory();
  const handleClick = (unitId) => {
    push(`${url}/subject/${unitId}`);
  };
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Box>
          <Button onClick={goBack} startIcon={<ArrowBackIos />}>
            Back to courses
          </Button>
        </Box>
        <Box sx={{ mt: 3, px: 7 }}>
          <Grid container spacing={1}>
            <Grid item xs={1}>
              <Avatar
                style={{ width: 72, height: 72 }}
                src={course?.imageUrl}
                alt={course?.title}
              />
            </Grid>
            <Grid item xs>
              <Box
                sx={{ height: "100%", display: "flex", alignItems: "center" }}
              >
                <Box>
                  <Typography variant="h4">{course?.title}</Typography>
                  <div
                    dangerouslySetInnerHTML={{ __html: course?.description }}
                  ></div>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h5"> {subjects.length} SUBJECTS</Typography>
      <Box sx={{ mt: 2, pb: 12 }}>
        <Grid container spacing={2}>
          {subjects.map((unit) => {
            return (
              <Grid key={unit.id} item xs={4}>
                <CourseCard handleClick={handleClick} course={unit} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      {/* <Accord /> */}
    </Container>
  );
}
