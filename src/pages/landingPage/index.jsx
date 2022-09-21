import * as React from "react";
import ProductCategories from "./ProductCategories";
import ProductSmokingHero from "./ProductSmokingHero";
import AppFooter from "./AppFooter";
import ProductHero from "./ProductHero";
import ProductValues from "./ProductValues";
import ProductHowItWorks from "./ProductHowItWorks";
import ProductCTA from "./ProductCTA.jsx";
import AppAppBar from "./AppAppBar";
import withRoot from "./withRoot";
import useDocTitle from "../../hooks/useDocTitle";
import Testimonials from "./testimonials";
import { useList } from "../../hooks";

function Index() {
  useDocTitle("Home");
  useList({
    slug: "courses",
    instance: "courses",
  });
  useList({
    slug: "about",
    instance: "courses",
  });
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
      <Testimonials />
      <ProductCTA />
      <ProductSmokingHero />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
