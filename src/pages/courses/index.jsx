import { Box } from "@mui/material";
import ErrorComponents from "../../components/shared/error";
import LoaderComponent from "../../components/shared/loader";
import { useDocTitle, useList } from "../../hooks";
import AppAppBar from "../landingPage/AppAppBar";
import AppFooter from "../landingPage/AppFooter";
import ProductHero from "../landingPage/ProductHero";
import withRoot from "../landingPage/withRoot";

function Courses() {
  useDocTitle("Courses");

  const { loading_courses: LoadingCourses, error: coursesError } = useList({
    instance: "courses",
    slug: "courses",
  });

  return (
    <Box sx={{ bgcolor: coursesError ? "lightgray" : "hsl(210, 46%, 95%)" }}>
      <AppAppBar />
      <ProductHero courses />
      {LoadingCourses && (
        <Box sx={{ ml: "100px" }}>
          <LoaderComponent desc="Courses" />
        </Box>
      )}

      {!LoadingCourses && coursesError && (
        <Box sx={{ ml: "90px", my: 9 }}>
          <ErrorComponents
            action="Check your network and reload this page, or contact support for help"
            desc="An error occured while fetching courses"
          />
        </Box>
      )}
      <Box sx={{ mt: 12 }}>
        <AppFooter />
      </Box>
    </Box>
  );
}

export default withRoot(Courses);
