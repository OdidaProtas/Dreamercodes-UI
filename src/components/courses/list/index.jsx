import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useList } from "../../../hooks";
import Item from "../item";

export default function () {
  const { goBack } = useHistory();

  const { getItemsArray: getCourses } = useList({
    instance: "courses",
    slug: "courses",
  });

  const courses = getCourses();
  return (
    <Container>
      <Box sx={{ px: 9, pt: 4, textAlign: "center" }}>
        <Stack spacing={3}>
          <Typography variant="h4">Your Courses</Typography>
          <Box>
            <Grid container spacing={2}>
              {courses.map((course) => {
                return <Item key={course.id} course={course} />;
              })}
            </Grid>
          </Box>
        </Stack>
        <Stack sx={{ my: 8, mb: 18 }} spacing={3}>
          <Typography variant="h4">Browse Courses</Typography>
          <Box>
            <Grid container spacing={2}>
              {courses.map((course) => {
                return <Item key={course.id} course={course} />;
              })}
            </Grid>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
