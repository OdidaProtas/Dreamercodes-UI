import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import Accord from "../../../../../components/courses/accord";
import { useList } from "../../../../../hooks";

export default function () {
  const { getItems: getSubjects, loading_subjects: loadingSubjects } = useList({
    instance: "courses",
    slug: "subjects",
  });

  const subjects = getSubjects();

  const { subject_id } = useParams();
  const { goBack } = useHistory();
  const subject = Boolean(subjects) ? subjects[subject_id] : {};

  return (
    <Container>
      <Stack sx={{ mt: 3 }} spacing={3}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ mr: 3 }}>
            <IconButton onClick={goBack}>
              <ArrowBack />
            </IconButton>
          </Box>
          <Typography variant="h4">
            Subject:{" "}
            {loadingSubjects ? <CircularProgress size={20} /> : subject?.title}
          </Typography>
        </Box>

        <Accord />
      </Stack>
    </Container>
  );
}
