import {
  Divider,
  LinearProgress,
  Typography,
  Box,
  Button,
  CircularProgress,
  Chip,
  Stack,
  Paper,
  Grid,
  Avatar,
} from "@mui/material";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import CourseCard from "../../../../components/mentor/courseCard";
import CoursesFab from "../../../../components/mentor/coursesFab";
import ErrorComponents from "../../../../components/shared/error";
import Loader from "../../../../components/shared/loader";
import { useDocTitle, useList } from "../../../../hooks";
import useItem from "../../../../hooks/useItem";

export default function () {
  useDocTitle("Course Detail");
  const {
    loading_subjects: loadingSubjects,
    getItems: getSubjects,
    error: subjectsError,
  } = useList({
    slug: "subjects",
    instance: "courses",
  });

  const {
    loading_units: loadingUnits,
    getItemsArray: getUnits,
    error: unitsError,
  } = useList({
    slug: "units",
    instance: "courses",
  });

  const units = getUnits();

  const { id } = useParams();

  const { push } = useHistory();
  const { url } = useRouteMatch();
  const subjects = getSubjects();

  const subject = subjects ? subjects[id] : null;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4">
            Subject :{" "}
            {loadingSubjects ? (
              <CircularProgress size={20} />
            ) : Boolean(subject) ? (
              `${subject?.title}`
            ) : subjectsError ? (
              <Chip label="Error" color="error" />
            ) : (
              ""
            )}
          </Typography>
        </Box>
        <Box>{/* <Button onClik variant="contained">Add Topic</Button> */}</Box>
      </Box>
      <Divider />
      {Boolean(subject) && !loadingSubjects && (
        <Stack spacing={3}>
          <img width={"100%"} height={144} src={subject.bannerUrl} alt="" />
          <div dangerouslySetInnerHTML={{ __html: subject.description }}></div>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h5"> {units.length} TOPICS</Typography>
            </Box>
            <Box>
              <Button
                onClick={() => push(`${url}/topic/new`)}
                variant="contained"
              >
                Add Topic
              </Button>
            </Box>
          </Box>
          <Divider />
          <Box>
            <Grid container spacing={2}>
              {units.map((unit) => {
                return (
                  <Grid key={unit.id} elevation={0} item xs={4}>
                    <CourseCard course={unit} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Stack>
      )}

      {loadingSubjects && <Loader desc="Subject" />}
      {subjectsError && !Boolean(subject) && (
        <ErrorComponents
          desc="An error occured loading course"
          action="Refresh page to try again, or contact support if problem persists"
        />
      )}
      <CoursesFab edit />
    </>
  );
}
