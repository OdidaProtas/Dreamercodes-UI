import { useDispatch } from "../../../../state/hooks";

export default function () {
  const dispatch = useDispatch();

  function handleDispatchLoadingOnboarding(bool) {
    dispatch({
      type: "ADD_ENTRIES",
      context: "loadingOnboardingProfile",
      payload: bool,
    });
  }

  function handledispatchOnboarding(data) {
    dispatch({
      type: "ADD_ENTRIES",
      context: "onboardingProfile",
      payload: data,
    });
  }

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

  return {
    handleOnboarded,
    handleSelectedCategory,
    handleSelectedCourse,
    handledispatchOnboarding,
    handleDispatchLoadingOnboarding,
  };
}
