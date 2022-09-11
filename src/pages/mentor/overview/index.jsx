import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDocTitle } from "../../../hooks";

export default function () {
  useDocTitle("Dashboard");
  const { push } = useHistory();
  return (
    <>
      <Typography variant="h4">Dashboard</Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <Paper sx={{ p: 2 }}>
            <img
              width="100%"
              src="https://i0.wp.com/ghanadmission.com/za/wp-content/uploads/2021/02/Courses.jpg"
              alt=""
            />
            <Typography variant="h5">0 Courses</Typography>
            <Divider sx={{ mb: 2 }} />
            <Button onClick={() => push("/mentor/courses")}>
              View Courses
            </Button>
            <Button onClick={() => push("/mentor/courses/new")}>
              Add course
            </Button>
          </Paper>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </>
  );
}
