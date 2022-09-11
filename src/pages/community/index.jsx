import { useDocTitle } from "../../hooks";
import AppAppBar from "../landingPage/AppAppBar";
import AppFooter from "../landingPage/AppFooter";
import ProductHero from "../landingPage/ProductHero";
import withRoot from "../landingPage/withRoot";

function Community() {
  useDocTitle("Community");
  return (
    <>
      <AppAppBar />
      <ProductHero community />
      <AppFooter />
    </>
  );
}

export default withRoot(Community);
