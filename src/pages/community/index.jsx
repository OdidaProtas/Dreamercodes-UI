import { Box, Grid } from "@mui/material";
import CourseCard from "../../components/mentor/courseCard";
import ErrorComponents from "../../components/shared/error";
import LoaderComponent from "../../components/shared/loader";
import { useDocTitle, useList } from "../../hooks";
import AppAppBar from "../landingPage/AppAppBar";
import AppFooter from "../landingPage/AppFooter";
import Typography from "../landingPage/components/Typography";
import ProductHero from "../landingPage/ProductHero";
import withRoot from "../landingPage/withRoot";
import Paper from "../landingPage/components/Paper";
function Community() {
  useDocTitle("Community");
  const {
    getItemsArray: getCourses,
    loading_events: loadingEvents,
    error: eventsError,
  } = useList({
    instance: "courses",
    slug: "events",
  });
  const events = getCourses();

  return (
    <>
      <AppAppBar />
      <ProductHero community />

      {loadingEvents && (
        <Box component={Paper} sx={{ ml: "100px" }}>
          <LoaderComponent desc="Courses" />
        </Box>
      )}
      <Box sx={{ mb: 5, p: 3 }}>
        <Typography variant="h6" marked="left" gutterBottom>
          Events
        </Typography>
        {!loadingEvents && eventsError && (
          <Box sx={{ ml: "90px", my: 9, pl: 9 }}>
            <ErrorComponents
              action="Check your network and reload this page, or contact support for help"
              desc="An error occured while fetching events"
            />
          </Box>
        )}
        {Boolean(events.length) && (
          <Grid sx={{ p: 9 }} container spacing={2}>
            {events.map((event) => {
              return (
                <Grid item xs={4} key={event.id}>
                  <CourseCard course={event} key={event} />
                </Grid>
              );
            })}
          </Grid>
        )}

        <Box sx={{ my: 9, textAlign: "center" }}>
          {!Boolean(events.length) && !loadingEvents && !eventsError && (
            <>No events found</>
          )}
        </Box>
      </Box>
      <AppFooter />
    </>
  );
}

export default withRoot(Community);
