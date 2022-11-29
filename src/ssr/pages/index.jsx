import Courses from "../../pages/courses";
import LandingPage from "../../pages/landingPage";

export const ssrFbs = {
  landigPage() {
    if (import.meta.env.SSR) {
      return <LandingPage />;
    }
    return null;
  },
  courses() {
    if (import.meta.env.SSR) {
      return <Courses />;
    }
    return null;
  },
  
};
