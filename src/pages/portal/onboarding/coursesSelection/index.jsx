import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { borderRadius } from "@mui/system";
import { useHistory } from "react-router-dom";
import getCourses from "../../../../data/courses";

export default () => {
  const courses = getCourses();
  const { push } = useHistory();
  return (
    <Container sx={{ pt: 9, textAlign: "center" }}>
      <Stack spacing={2}>
        <Typography variant="h4">Select your first course</Typography>
        <Typography>
          Don’t worry, you can add as many courses as you want later.
        </Typography>
        <Grid container>
          {courses.map((course, index) => {
            const { name } = course;
            return (
              <Grid key={index} item xs={3}>
                <Paper
                  onClick={() => push("/portal/onboarding/motivational")}
                  sx={{ p: 2, cursor: "pointer" }}
                >
                  <Box>
                    <img
                      style={{ borderRadius: "50%" }}
                      src="https://sololearnuploads.azureedge.net/uploads/courses/1014.png"
                      alt="Course Image"
                    />
                    <Typography variant="h5">{name}</Typography>
                    <Typography>
                      Fundamentals of front-end development
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </Container>
  );
};
