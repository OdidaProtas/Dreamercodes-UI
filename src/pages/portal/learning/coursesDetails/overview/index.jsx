import { ArrowBackIos } from "@mui/icons-material";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import Accord from "../../../../../components/courses/accord";

export default function () {
  const { goBack } = useHistory();
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Box>
          <Button onClick={goBack} startIcon={<ArrowBackIos />}>
            Back to courses
          </Button>
        </Box>
        <Box sx={{ mt: 3, px: 7 }}>
          <Grid container spacing={1}>
            <Grid item xs={1}>
              <img
                height={72}
                style={{ borderRadius: "50%" }}
                src="https://sololearnuploads.azureedge.net/uploads/courses/1073.png"
                alt=""
              />
            </Grid>
            <Grid item xs>
              <Box
                sx={{ height: "100%", display: "flex", alignItems: "center" }}
              >
                <Box>
                  <Typography variant="h5">Python core</Typography>
                  <Typography>
                    Learn Python, one of today's most in-demand programming
                    languages on-the-go! Practice writing Python code, collect
                    points, & show off your skills now!
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Accord />
    </Container>
  );
}
