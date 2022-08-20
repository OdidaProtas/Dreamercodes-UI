import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import PlayArrow from "@mui/icons-material/PlayArrow";
import { useHistory, useRouteMatch } from "react-router-dom";

export default function () {
  const { push } = useHistory();
  const { url } = useRouteMatch();
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Grid container spacing={2}>
            <Grid item xs>
              <Paper
                onClick={() => push(`${url}/:lesson_id/:task_id`)}
                sx={{ p: 2, cursor: "pointer" }}
              >
                <Box>
                  <Typography sx={{ mb: 2 }} variant="h6">
                    1.1 Lesson
                  </Typography>
                  <Typography>Welcome to Python!</Typography>
                  <Box
                    sx={{
                      mt: 4,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>0 Comments</Typography>
                    <PlayArrow />
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper
                onClick={() => push(`${url}/:lesson_id/:task_id/practice`)}
                sx={{ p: 2, cursor: "pointer" }}
              >
                <Box>
                  <Typography sx={{ mb: 2 }} variant="h6">
                    1.2 Lesson
                  </Typography>
                  <Typography>Your first program!</Typography>
                  <Box
                    sx={{
                      mt: 2,
                    }}
                  >
                    <Button disableElevation variant="contained" fullWidth>
                      Practice (10pt)
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Grid container spacing={2}>
            <Grid item xs>
              <Paper sx={{ p: 2 }}>
                <Box>
                  <Typography sx={{ mb: 2 }} variant="h6">
                    2.1 Lesson
                  </Typography>
                  <Typography>Simple operations</Typography>
                  <Box
                    sx={{
                      mt: 4,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>0 Comments</Typography>
                    <PlayArrow />
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
