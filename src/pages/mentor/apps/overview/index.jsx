import { LocalFireDepartmentSharp } from "@mui/icons-material";
import { Box, Button, Grid, Toolbar } from "@mui/material";
import { useHistory, useRouteMatch } from "react-router-dom";
import CourseCard from "../../../../components/mentor/courseCard";
import Loader from "../../../../components/shared/loader";
import { useDocTitle, useList } from "../../../../hooks";

export default function AppOverview() {
  const { url } = useRouteMatch();
  const { push } = useHistory();
  const { getItemsArray: getApps, loading_apps: loadingApps } = useList({
    instance: "auth",
    slug: "apps",
  });
  const apps = getApps();

  useDocTitle("Organizations Overview");

  if (loadingApps) {
    return <Loader desc="apps" />;
  }

  return (
    <>
      <Toolbar />
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Button
          disableElevation
          variant="contained"
          onClick={() => push(`${url}/new`)}
        >
          Create App
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Grid spacing={2} container>
          {apps.map((app) => {
            return (
              <Grid key={app.id} item xs={4}>
                <CourseCard course={app} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}
