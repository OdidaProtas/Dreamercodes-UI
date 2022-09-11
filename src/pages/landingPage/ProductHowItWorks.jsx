import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "./components/Button";
import Typography from "./components/Typography";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: "default",
  color: "secondary.main",
  fontWeight: "medium",
};

const image = {
  height: 55,
  my: 4,
};

function ProductHowItWorks() {
  return (
    <Box
      component="section"
      sx={{ display: "flex", bgcolor: "secondary.light", overflow: "hidden" }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src="https://mui.com/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: "none",
            position: "absolute",
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
          How it works
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Box
                  component="img"
                  src="https://www.clipartmax.com/png/middle/481-4812648_assistance-pour-particulier-%C3%A0-barcelone-icon-create-account-png.png"
                  alt="Signup"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Create an account online, choose your stack. You can also find
                  help choosing the right stack.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Box
                  component="img"
                  src="https://cdn3.iconfinder.com/data/icons/human-activities-and-social-interaction/256/mindshare_256x256-512.png"
                  alt="graph"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  You are assigned a cohort. Your peers help in pair
                  programming, sprint and code reviews
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Box
                  component="img"
                  src="https://www.iconpacks.net/icons/1/free-certificate-icon-1356-thumb.png"
                  alt="clock"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Your mentor does cumulative assesments on your weekly
                  projects. A certificate is issued upon completion
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          component="a"
          href="/accounts/signup"
          sx={{ mt: 8 }}
        >
          Get started
        </Button>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;
