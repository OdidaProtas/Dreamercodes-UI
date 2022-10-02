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
import CourseCard from "../../../../../components/mentor/courseCard";
import { useItem, useList } from "../../../../../hooks";

export default function CourseDetailOverview() {
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
        <Box></Box>
        <Box sx={{ mt: 3, px: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Avatar
                  sx={{ height: 50, width: 50 }}
                  src={course?.imageUrl}
                ></Avatar>
                <Typography variant="h4">{course?.title}</Typography>

                <Box sx={{ pt: 1}}>
                  <Button
                    disableElevation
                    variant="contained"
                    onClick={goBack}
                    startIcon={<ArrowBackIos />}
                  >
                    GO BACK
                  </Button>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{ height: "100%", display: "flex", alignItems: "center" }}
              >
                <Box>
                  <div
                    dangerouslySetInnerHTML={{ __html: course?.description }}
                  ></div>
                </Box>
              </Box>
            </Grid>
            <Grid item xs></Grid>
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
