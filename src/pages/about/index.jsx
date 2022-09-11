import { useDocTitle } from "../../hooks";
import AppAppBar from "../landingPage/AppAppBar";
import AppFooter from "../landingPage/AppFooter";
import ProductHero from "../landingPage/ProductHero";
import withRoot from "../landingPage/withRoot";

function About() {
    useDocTitle("About Us")
  return (
    <>
      <AppAppBar />
      <ProductHero about />
      <AppFooter />
    </>
  );
}

export default withRoot(About);
