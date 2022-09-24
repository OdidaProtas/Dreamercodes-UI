import { useEffect, useState } from "react";
import { useAuth, useAxios } from "../../../../../hooks";
import { useDispatch, useStateValue } from "../../../../../state/hooks";
import actions from "../../actions";

import network from "../../../../../network";

export default function () {
  const [error, setError] = useState(false);

  const { endpoints } = network;

  const dispatch = useDispatch();

  const { axiosAction, loading } = useAxios("onboarding");

  const {
    onboardingProfile,
    loading_student_profile: loadingOnboardingProfile,
  } = useStateValue();

  const { handledispatchOnboarding, handleDispatchLoadingOnboarding } =
    actions();

  const { getCurrentUser } = useAuth();

  const user = getCurrentUser();

  function successHandler(res) {
    handledispatchOnboarding(res.data);
    dispatch({
      type: "ADD_ENTRIES",
      payload: false,
      context: "loading_student_profile",
    });
  }

  function errorHandler(error) {
    setError(true);
    dispatch({
      type: "ADD_ENTRIES",
      payload: false,
      context: "loading_student_profile",
    });
  }

  useEffect(() => {
    if (!Boolean(onboardingProfile) && !loading && !loadingOnboardingProfile) {
      dispatch({
        type: "ADD_ENTRIES",
        payload: true,
        context: "loading_student_profile",
      });
      axiosAction({
        successHandler,
        errorHandler,
        method: "get",
        endpoint: `/onboarding-byuser/${user?.id}`,
      });
    }
  }, [user?.id]);

  useEffect(() => {
    handleDispatchLoadingOnboarding(loading);
  }, [loading]);

  return {
    loading: loadingOnboardingProfile,
    error,
    profile: onboardingProfile,
  };
}
