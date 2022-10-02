import { useMemo } from "react";
import { useDispatch, useStateValue } from "../../../../../state/hooks";

export function useActions() {
  const { courses: prevCourses } = useStateValue();
  const dispatch = useDispatch();
  const addCourseToState = useMemo(
    (course) => {
      const allCourses = { ...prevCourses, [course?.id]: course };
      // dispatch({
      //   type: "ADD_ENTRIES",
      //   context: "courses",
      //   payload: allCourses,
      // });
    },
    []
  );

  return { addCourseToState };
}
