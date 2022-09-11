import { useEffect, useState } from "react";
import { useAuth, useAxios } from "../../../../../hooks";
import { useStateValue } from "../../../../../state/hooks";
import actions from "../../actions";

import network from "../../../../../network";

export default function () {
  const [error, setError] = useState(false);

  const { endpoints } = network;

  const { axiosAction, loading } = useAxios("onboarding");

  const { onboardingProfile, loadingOnboardingProfile } = useStateValue();

  const { handledispatchOnboarding, handleDispatchLoadingOnboarding } =
    actions();

  const { getCurrentUser } = useAuth();

  const user = getCurrentUser();

  function successHandler(res) {
    handledispatchOnboarding(res.data);
  }

  function errorHandler(error) {
    setError(true);
  }

  useEffect(() => {
    if (!Boolean(onboardingProfile))
      axiosAction({
        successHandler,
        errorHandler,
        method: "get",
        endpoint: `${endpoints.ONBOARDING_URLS.userProfile}/${user.id}`,
      });
  }, []);

  useEffect(() => {
    handleDispatchLoadingOnboarding(loading);
  }, [loading]);

  return {
    loading: loadingOnboardingProfile,
    error,
    profile: onboardingProfile,
  };
}
