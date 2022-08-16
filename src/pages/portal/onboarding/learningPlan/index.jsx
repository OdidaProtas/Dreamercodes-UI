import {
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import LottieControl from "../../../../components/animations";
import javaLogo from "../../../../assets/java.webp";
import TimerIcon from "@mui/icons-material/Timer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useHistory } from "react-router-dom";

export default function () {
  const { push } = useHistory();

  return (
    <Container sx={{ textAlign: "center", pb: 6 }}>
      <Stack spacing={3}>
        <Box>
          <LottieControl />
          <Typography variant="h4">Awesome! You’re all set up</Typography>
          <Typography variant="h6">
            You'll complete the Java course by October 18th. Want to learn
            faster? You can adjust your practice goal later.
          </Typography>
        </Box>
        <Box sx={{ px: { lg: 9 } }}>
          <Paper sx={{ p: 4 }}>
            <Grid container>
              <Grid item xs>
                <Grid container>
                  <Grid item xs>
                    <img
                      width="70%"
                      height={90}
                      style={{ borderRadius: "50%" }}
                      src={javaLogo}
                      alt=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs
                    sx={{
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography>LEARN</Typography>
                      <Typography variant="h6">Java</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs>
                <Grid container>
                  <Grid item xs>
                    <TimerIcon sx={{ fontSize: "90px" }} />
                  </Grid>
                  <Grid
                    item
                    xs
                    sx={{
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography>PRACTICE</Typography>
                      <Typography variant="h6">1 lesson a day</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs>
                <Grid container>
                  <Grid item xs>
                    <CalendarMonthIcon sx={{ fontSize: "90px" }} />
                  </Grid>
                  <Grid
                    item
                    xs
                    sx={{
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography>FINISH BY</Typography>
                      <Typography variant="h6">18 Oct</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        <Box>
          <Button
            onClick={() => push("/portal/onboarding/payment")}
            variant="contained"
            disableElevation
          >
            Continue
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}

// entities: ["database/models/**/*.ts"],
