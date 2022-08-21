import {
  Grid,
  Container,
  Box,
  Paper,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import CourseProgress from "./courseProgress";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { useHistory, useRouteMatch } from "react-router-dom";
import Achievements from "../../dialogs/achievements";
export default function () {
  const { push } = useHistory();
  const { url } = useRouteMatch();
  return (
    <Container>
      <Box sx={{ px: 6 }}>
        <Grid container spacing={2}>
          <Grid item xs>
            <Stack spacing={3}>
              <Paper sx={{ p: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h5">Courses Progress</Typography>
                  <Box>
                    <Button>Manage</Button>
                  </Box>
                </Box>
                <Box sx={{ py: 3 }}>
                  <Button
                    onClick={() => push(`${url}/learning/:id`)}
                    size="large"
                    fullWidth
                  >
                    <Grid container>
                      <Grid item xs>
                        <img
                          width={40}
                          style={{ borderRadius: "50%" }}
                          src="https://sololearnuploads.azureedge.net/uploads/courses/1068.png"
                          alt=""
                        />
                      </Grid>
                      <Grid item xs={8} sx={{ pt: 1 }}>
                        <CourseProgress />
                      </Grid>
                      <Grid item xs sx={{ pt: 1 }}>
                        <PlayArrowIcon />
                      </Grid>
                    </Grid>
                  </Button>
                </Box>
                <Button
                  onClick={() => push(`${url}/learning`)}
                  fullWidth
                  variant="outlined"
                >
                  Browse Courses
                </Button>
              </Paper>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h5">Code Snippets</Typography>
                <Typography sx={{ my: 3 }}>
                  You don’t have any saved codes yet
                </Typography>
                <Button fullWidth variant="outlined">
                  ADD NEW
                </Button>
              </Paper>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h5">Your Resume</Typography>
                <Typography sx={{ my: 3 }}>Update your resume below</Typography>
                <Button fullWidth variant="outlined">
                  Update resume
                </Button>
              </Paper>
            </Stack>
          </Grid>
          <Grid item xs>
            <Paper sx={{ p: 2 }}>
              <Stack spacing={3}>
                <Typography variant="h5">Recent Achievements</Typography>
                <Box>
                  <RocketLaunchIcon fontSize="large" sx={{ color: "blue" }} />
                  <CheckCircleIcon
                    fontSize="large"
                    sx={{ color: "green", ml: 2 }}
                  />
                </Box>
                <Typography variant="h5">Next Task</Typography>
                <Box>
                  <Button size="large" fullWidth>
                    <Grid container>
                      <Grid item xs>
                        <Box sx={{ fontSize: "81px" }}>
                          <LocalLibraryIcon fontSize="inherit" color="gray" />
                        </Box>
                      </Grid>
                      <Grid item xs={8} sx={{ pt: 1, textAlign: "left" }}>
                        <Typography variant="h5" sx={{ textTransform: "none" }}>
                          Engaged in!
                        </Typography>
                        <Typography sx={{ textTransform: "none" }}>
                          Every successful coder has to start somewhere, and
                          finishing a lesson is a great place to start!
                        </Typography>
                      </Grid>
                    </Grid>
                  </Button>
                </Box>
                <Achievements />
              </Stack>
            </Paper>
            <Paper sx={{ p: 2, mt: 3 }}>
              <Typography variant="h5">Code Mentor</Typography>
              <Typography sx={{ my: 3 }}>
                No available Code Mentors. Learn a course to get one.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
