import { ArrowBackIos } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import Drawer from "../../../../../components/comments/drawer";
import VerticalTabs from "../../../../../components/learning";
import CourseProgress from "../../../../../components/portalHome/cards/courseProgress";

export default function Lesson() {
  const { goBack } = useHistory();

  return (
    <Box
      sx={{
        bgcolor: "azure",
        maxHeight: "98vh",
        minHeight: "88vh",
        pt: 1,
        overflow: "hidden",
      }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Button
              sx={{ display: "flex", textTransform: "none" }}
              onClick={goBack}
              startIcon={<ArrowBackIos />}
            >
              Introduction to programming
            </Button>
          </Grid>
          <Grid item xs sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ flexGrow: "1" }}>
              <CourseProgress />
            </Box>
          </Grid>
          <Grid item xs={5} sx={{ textAlign: "right" }}>
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <Box>
                <Drawer title="Notes" />
              </Box>
              <Box>
                <Drawer title="Comments" />
              </Box>
              <Box>
                <ToggleButtonGroup
                  color="primary"
                  size="small"
                  fullWidth
                  // value={alignment}
                  exclusive
                  // onChange={handleChange}
                  aria-label="Platform"
                >
                  <ToggleButton value="web">Prev</ToggleButton>
                  <ToggleButton value="android">1.2</ToggleButton>
                  <ToggleButton value="ios">Next</ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2 }} />
        <Box>
          <VerticalTabs />
        </Box>
      </Container>
    </Box>
  );
}
