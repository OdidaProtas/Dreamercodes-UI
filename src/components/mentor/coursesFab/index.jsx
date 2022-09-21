import { Add, Edit } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { useHistory, useLocation, useParams } from "react-router-dom";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

export default function ({ edit }) {
  const { push } = useHistory();
  const { id } = useParams();
  const { pathname } = useLocation();
  const isCourses = /\/courses/.test(pathname);
  const isSubjects = /\/subjects/.test(pathname);
  return (
    <Fab
      onClick={() =>
        push(
          `/mentor/${isCourses ? "courses" : isSubjects ? "subjects" : ""}/${
            edit ? `${id}/edit` : "new"
          }`
        )
      }
      sx={fabStyle}
      aria-label={"Add Courses"}
      color={"inherit"}
    >
      {edit ? <Edit /> : <Add />}
    </Fab>
  );
}
