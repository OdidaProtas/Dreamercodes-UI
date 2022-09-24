import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Avatar, Box, Button, Grid, Paper, Typography } from "@mui/material";
import PlayArrow from "@mui/icons-material/PlayArrow";
import NotesIcon from "@mui/icons-material/Notes";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useList } from "../../../hooks";

export default function DetailTimeline() {
  const { push } = useHistory();
  const { url } = useRouteMatch();

  const { getItemsArray } = useList({
    instance: "courses",
    slug: "lessons",
  });

  const { getItemsArray: getsubtopics } = useList({
    instance: "courses",
    slug: "subtopics",
  });

  const lessons = getItemsArray();
  const subtopics = getsubtopics();

  return (
    <Timeline position="alternate">
      {lessons.map((lesson, index) => {
        return (
          <TimelineItem key={lesson.id}>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Grid container spacing={2}>
                {subtopics.map((subtopic, idx) => {
                  return (
                    <Grid key={subtopic.id} item xs={6}>
                      <Paper
                        elevation={0}
                        onClick={() =>
                          push(`/portal/learning/task/${subtopic.id}`)
                        }
                        sx={{ p: 2, cursor: "pointer" }}
                      >
                        <Box>
                          <Typography sx={{ mb: 2 }} variant="h6">
                            <span style={{ display: "flex" }}>
                              <Box
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  pl: 2,
                                  flexGrow: 1,
                                }}
                              >
                                {index + 1}.{idx + 1} Lesson
                              </Box>
                              <Avatar>
                                {!subtopic.isTask && <NotesIcon />}
                                {subtopic.isTask && <AssignmentIcon />}
                              </Avatar>
                            </span>
                          </Typography>
                          <Typography>{subtopic.title}</Typography>
                          <Box
                            sx={{
                              mt: 4,
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography>0 Notes</Typography>
                            <Typography>0 Comments</Typography>
                            <PlayArrow />
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}
