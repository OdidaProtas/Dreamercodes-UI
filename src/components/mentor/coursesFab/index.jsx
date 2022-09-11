import { Add, Edit } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

export default function ({ edit }) {
  const { push } = useHistory();
  const { id } = useParams();
  return (
    <Fab
      onClick={() => push(`/mentor/courses/${edit ? `${id}/edit` : "new"}`)}
      sx={fabStyle}
      aria-label={"Add Courses"}
      color={"inherit"}
    >
      {edit ? <Edit /> : <Add />}
    </Fab>
  );
}
