import * as React from "react";
import Button from "./components/Button";
import Typography from "./components/Typography";
import ProductHeroLayout from "./ProductHeroLayout";

const coursesImage =
  "https://res.cloudinary.com/dreamercodes/image/upload/v1662909362/banner-bg_skwcqr.jpg";

const backgroundImage =
  "https://res.cloudinary.com/dreamercodes/image/upload/v1662905214/programming-and-coding-concept-modern-flat-design-for-web-banner-website-element-or-web-template-vector_yjoa8q.jpg";

const aboutUsImage =
  "https://res.cloudinary.com/dreamercodes/image/upload/v1662910194/about-us-background_cguahz.jpg";

const communityImage =
  "https://res.cloudinary.com/dreamercodes/image/upload/v1662910947/pngtree-color-creative-silhouette-society-recruit-new-poster-background-material-image_147157_o0bcmz.jpg";

export default function ProductHero({ courses, about, community }) {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${
          courses
            ? coursesImage
            : about
            ? aboutUsImage
            : community
            ? communityImage
            : backgroundImage
        })`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center",
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none", zIndex: 2 }}
        src={
          "https://thumbs.dreamstime.com/b/image-wood-texture-boardwalk-beautiful-autumn-landscape-background-free-copy-space-use-background-backdrop-to-132997627.jpg"
        }
        alt="increase priority"
      />
      <Typography
        sx={{ zIndex: 2, }}
        color="secondary"
        align="center"
        variant="h2"
        marked="center"
      >
        {courses
          ? "Our Courses"
          : about
          ? "About Us"
          : community
          ? "Our Community"
          : "The school operating system"}
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 }, zIndex: 2 }}
      >
        {courses && !about
          ? "Market-aligned Courses Curated to help you build your dream projects"
          : community
          ? "Connect with an exciting community of dreamers, get help and discover events"
          : "All level school, lms with all education tools"}
      </Typography>
      {!about && (
        <>
          <Button
            color="primary"
            variant="contained"
            size="large"
            component="a"
            href="/accounts/signup"
            sx={{ minWidth: 200, zIndex: 2 }}
          >
            {community ? "Join Official Discord" : "Register"}
          </Button>
          <Typography variant="body2" color="inherit" sx={{ mt: 2, zIndex: 2 }}>
            {community ? "Discover events below" : "Discover the experience"}
          </Typography>
        </>
      )}
    </ProductHeroLayout>
  );
}
