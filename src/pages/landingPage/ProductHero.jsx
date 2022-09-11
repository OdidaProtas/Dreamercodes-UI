import * as React from "react";
import Button from "./components/Button";
import Typography from "./components/Typography";
import ProductHeroLayout from "./ProductHeroLayout";

const backgroundImage =
  "https://thumbs.dreamstime.com/b/image-wood-texture-boardwalk-beautiful-autumn-landscape-background-free-copy-space-use-background-backdrop-to-132997627.jpg";

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center",
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none" }}
        src={
          "https://thumbs.dreamstime.com/b/image-wood-texture-boardwalk-beautiful-autumn-landscape-background-free-copy-space-use-background-backdrop-to-132997627.jpg"
        }
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Learn to code online
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Learn to code and build your dream projects, from the comfort of your
        home
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/accounts/signup"
        sx={{ minWidth: 200 }}
      >
        Register
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}
