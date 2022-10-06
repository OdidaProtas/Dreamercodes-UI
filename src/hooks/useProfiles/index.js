import { useEffect } from "react";
import { useAuth, useAxios } from "..";
import { useStateValue } from "../../state/hooks";

export default function useProfiles() {
  const { getCurrentUser } = useAuth();
  const { profiles } = useStateValue();
  const user = getCurrentUser();

  const { loading, axiosAction } = useAxios("auth");

  function successHandler({ data }) {
    console.log(data);
  }

  function errorHandler(error) {
    console.debug(error);
  }

  useEffect(() => {
    axiosAction({
      errorHandler,
      successHandler,
      method: "get",
      endpoint: `/profiles/${user?.id}`,
    });
  }, [user?.id]);

  return { loading, profile: profiles };
}
