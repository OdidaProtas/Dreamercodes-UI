import { useDispatch } from "../../../../state/hooks";

export default function () {
  const dispatch = useDispatch();
  function handleOnboarded() {
    dispatch({
      type: "ADD_ENTRIES",
      context: "onBoarded",
      payload: true,
    });
  }

  function handleSelectedCategory(category) {
    dispatch({
      type: "ADD_ENTRIES",
      context: "prefferedCategory",
      payload: category,
    });
  }

  function handleSelectedCourse(course) {
    dispatch({
      type: "ADD_ENTRIES",
      context: "selectedCourse",
      payload: course,
    });
  }

  return { handleOnboarded, handleSelectedCategory, handleSelectedCourse };
}
