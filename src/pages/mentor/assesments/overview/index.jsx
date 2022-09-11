import { LinearProgress, Typography } from "@mui/material";
import CourseCard from "../../../../components/mentor/courseCard";
import CoursesFab from "../../../../components/mentor/coursesFab";
import ErrorComponent from "../../../../components/shared/error";
import LoaderComponent from "../../../../components/shared/loader";
import { useDocTitle, useList } from "../../../../hooks";

export default function () {
  useDocTitle("Assesments Overview");

  const {
    loading_assesments: loadingAssesments,
    getItemsArray,
    error: assesmentsError,
  } = useList({
    slug: "assesments",
    instance: "courses",
  });

  const assesments = getItemsArray();

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Assesments
      </Typography>
      {loadingAssesments && <LoaderComponent desc="Assesments" />}
      {assesmentsError && !Boolean(assesments.length) && !loadingAssesments && (
        <ErrorComponent
          action="Refresh the page to try again, or contact support"
          desc="An error occured while fetching assesments"
        />
      )}
      {Boolean(assesments.length) && <CourseCard />}
      <CoursesFab />
    </>
  );
}
