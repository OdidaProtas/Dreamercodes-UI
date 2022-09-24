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
import { useEffect } from "react";
import { useState } from "react";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import CourseCard from "../../../../components/mentor/courseCard";
import CoursesFab from "../../../../components/mentor/coursesFab";
import ErrorComponents from "../../../../components/shared/error";
import Loader from "../../../../components/shared/loader";
import { useDocTitle, useList, useQueryParams } from "../../../../hooks";
import useItem from "../../../../hooks/useItem";

export default function () {
  useDocTitle("Course Detail");

  const [isLessonView, setIsLessonView] = useState(false);

  const {
    loading_units: loadingUnits,
    getItems: getUnits,
    error: unitsError,
  } = useList({
    slug: "units",
    instance: "courses",
  });

  const units = getUnits();

  const { topic, id } = useParams();

  const { push, goBack } = useHistory();
  const { url } = useRouteMatch();

  const { getItemsArray: getLessons, getItems } = useList({
    slug: "lessons",
    instance: "courses",
  });

  const { getItemsArray: getSubTopics, getItems: getSubtopicsObj } = useList({
    slug: "subtopics",
    instance: "courses",
  });

  const subTopics = getSubTopics();

  const lessons = getLessons();

  const { search } = useLocation();

  const params = new URLSearchParams(search);
  const focus = params.get("focus");
  const focusId = params.get("focus_id");
  const showDetail = Boolean(params.get("show_detail"));
  const detailId = params.get("detail_id");

  const lessonRepository = getItems();
  const taskRepository = getSubtopicsObj();

  const focused = Boolean(lessonRepository) ? lessonRepository[focusId] : null;

  const task = Boolean(taskRepository) ? taskRepository[detailId] : null;

  const isFocused = focus === "lesson";
  const isDetail = isFocused && showDetail;

  const { getItem: gItem } = useItem({
    instance: "courses",
    itemId: { id: detailId },
    slug: "subtopics",
  });

  const unit = isDetail
    ? task ?? gItem()
    : isFocused
    ? focused
    : units
    ? units[topic]
    : null;

  const handleCardClick = (fId) => {
    if (!isFocused)
      push({
        search: `?focus=lesson&focus_id=${fId}`,
      });
    else {
      push({
        search: `?focus=lesson&focus_id=${focusId}&show_detail=true&detail_id=${fId}`,
      });
    }
  };

  const handleEdit = () => {
    if (isDetail)
      push(
        `/mentor/subjects/${id}/${topic}/sub-topic/new?mode=edit&item=${detailId}`
      );
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4">
            {isDetail ? "Subtopic" : isFocused ? "Lesson" : "Unit"} :{" "}
            {loadingUnits ? (
              <CircularProgress size={20} />
            ) : isFocused ? (
              focused?.title
            ) : Boolean(unit) ? (
              `${unit?.title}`
            ) : unitsError ? (
              <Chip label="Error" color="error" />
            ) : (
              ""
            )}
          </Typography>
        </Box>
        <Box>
          <Button sx={{ mr: 2 }} onClick={handleEdit} variant="outlined">
            Edit
          </Button>
          <Button disableElevation onClick={goBack} variant="contained">
            Go Back
          </Button>
        </Box>
      </Box>
      <Divider />
      {Boolean(unit) && (
        <Stack spacing={3}>
          <img width={"100%"} height={144} src={unit.bannerUrl} alt="" />
          <div dangerouslySetInnerHTML={{ __html: unit.description }}></div>
          {!isDetail && (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h5">
                    {" "}
                    {(isFocused ? subTopics : lessons).length}{" "}
                    {isFocused ? "Sub Topics" : "Lesson"}
                  </Typography>
                </Box>
                <Box>
                  <Button
                    disableElevation
                    onClick={() =>
                      push(`${url}/${isFocused ? "sub-topic" : "lesson"}/new`)
                    }
                    variant="contained"
                  >
                    Add {isFocused ? "Sub Topics" : "Lesson"}
                  </Button>
                </Box>
              </Box>
              <Divider />
            </>
          )}

          <Box>
            <Grid container spacing={2}>
              {!isDetail &&
                (isFocused ? subTopics : lessons).map((lesson) => {
                  return (
                    <Grid key={lesson.id} elevation={0} item xs={4}>
                      <CourseCard
                        handleClick={handleCardClick}
                        course={lesson}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
        </Stack>
      )}

      {loadingUnits && <Loader desc="Subject" />}
      {unitsError && !Boolean(unit) && (
        <ErrorComponents
          desc="An error occured loading course"
          action="Refresh page to try again, or contact support if problem persists"
        />
      )}
    </>
  );
}
