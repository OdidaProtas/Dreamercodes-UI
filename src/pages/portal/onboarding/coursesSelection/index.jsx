import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import getCourses from "../../../../data/courses";
import { useStateValue } from "../../../../state/hooks";
import { capitalizeFirstLetter } from "../../../../utils/utils";

export default () => {
  const [coursesOpen, setCoursesOpen] = useState(false);

  const courses = getCourses();
  const { push } = useHistory();

  const { prefferedCategory } = useStateValue();

  const hasPrefference = Boolean(prefferedCategory);

  const category = hasPrefference ? prefferedCategory.split("_").join(" ") : "";

  const toggleAllCourses = () => setCoursesOpen((o) => !o);

  return (
    <Container sx={{ py: 9, textAlign: "center" }}>
      <Stack spacing={2}>
        {!hasPrefference && (
          <Typography variant="h4">Select your first course</Typography>
        )}

        {hasPrefference && (
          <Typography variant="h4">
            {capitalizeFirstLetter(category)}
          </Typography>
        )}
        <Typography>
          Don’t worry, you can add as many courses as you want later.
        </Typography>
        <Grid container sx={{ p: 6 }}>
          {courses.map((course, index) => {
            const { name } = course;
            return (
              <Grid key={index} item xs={2}>
                <Paper
                  onClick={() => push("/portal/onboarding/motivational")}
                  sx={{ p: 2, cursor: "pointer" }}
                >
                  <Box>
                    <img
                      width={"100%"}
                      style={{ borderRadius: "50%" }}
                      src="https://sololearnuploads.azureedge.net/uploads/courses/1014.png"
                      alt="Course Image"
                    />
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="h5">{name}</Typography>
                    <Typography>100 Learners</Typography>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
        {hasPrefference && (
          <>
            <Box sx={{ mb: 2 }}>
              <Button
                onClick={toggleAllCourses}
                disableElevation
                variant="contained"
              >
                {coursesOpen ? "Hide" : "Show"} All Courses
              </Button>
            </Box>
            {coursesOpen && (
              <>
                <Box>
                  <Grid container sx={{ p: 6, pt: 1 }}>
                    {courses.map((course, index) => {
                      const { name } = course;
                      return (
                        <Grid key={index} item xs={2}>
                          <Paper
                            onClick={() =>
                              push("/portal/onboarding/motivational")
                            }
                            sx={{ p: 2, cursor: "pointer" }}
                          >
                            <Box>
                              <img
                                width={"100%"}
                                style={{ borderRadius: "50%" }}
                                src="https://sololearnuploads.azureedge.net/uploads/courses/1014.png"
                                alt="Course Image"
                              />
                              <Divider sx={{ my: 1 }} />
                              <Typography variant="h5">{name}</Typography>
                              <Typography>100 Learners</Typography>
                            </Box>
                          </Paper>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </>
            )}
          </>
        )}
      </Stack>
    </Container>
  );
};
