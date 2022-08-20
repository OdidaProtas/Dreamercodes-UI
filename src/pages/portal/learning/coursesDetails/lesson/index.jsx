import { ArrowBackIos } from "@mui/icons-material";
import { Box, Button, Container, Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import Drawer from "../../../../../components/comments/drawer";
import CourseProgress from "../../../../../components/portalHome/cards/courseProgress";

export default function () {
  const { goBack } = useHistory();
  return (
    <Container>
      <Grid container sx={{ mt: 6 }} spacing={2}>
        <Grid item xs={4}>
          <Button onClick={goBack} startIcon={<ArrowBackIos />}>
            Welcome to Python
          </Button>
        </Grid>
        <Grid item xs>
          <CourseProgress />
        </Grid>
        <Grid item xs={3} sx={{ textAlign: "right" }}>
          <Drawer />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <Box sx={{ textAlign: "right", mt: 6 }}>
          <Button variant="contained" disableElevation>
            Continue
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
