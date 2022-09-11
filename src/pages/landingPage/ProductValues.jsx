import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "./components/Typography";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: "flex", overflow: "hidden", bgcolor: "secondary.light" }}
    >
      <Container sx={{ mt: 15, mb: 30, display: "flex", position: "relative" }}>
        <Box
          component="img"
          src="https://mui.com/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: "none", position: "absolute", top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="data:image/png;base64,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"
                alt="Explore"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                EXPLORE
              </Typography>
              <Typography variant="h5">
                {"Take your first guided steps in programming."}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="https://cdn-icons-png.flaticon.com/512/4785/4785366.png"
                alt="graph"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Discover
              </Typography>
              <Typography variant="h5">
                {"Find your passion in writing code and building projects."}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="https://cdn-icons-png.flaticon.com/512/2587/2587057.png"
                alt="clock"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Transform
              </Typography>
              <Typography variant="h5">
                {"Find a new job, build your dream projects"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
