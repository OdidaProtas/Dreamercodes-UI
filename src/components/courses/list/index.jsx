import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import getCourses from "../../../data/courses";
import Item from "../item";

export default function () {
  const courses = getCourses();
  const { goBack } = useHistory();
  return (
    <Container>
      <Box sx={{ px: 9, pt: 4, textAlign:"center" }}>
        <Stack spacing={3}>
          <Typography variant="h4">What would you like to learn?</Typography>
          <Box>
            <Grid container spacing={2}>
              {courses.map((course) => {
                return <Item course={course} />;
              })}
            </Grid>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
