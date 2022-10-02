import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useStateValue } from "../../state/hooks";
import useAxios from "../useAxios";
import useSubdomain from "../useSubdomain";
import useToast from "../useToast";

export default function useOrg() {
  const subdomain = useSubdomain();

  const { organization, loadingOrg } = useStateValue();
  const { pathname } = useLocation();
  const { loading, axiosAction } = useAxios("auth");
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const { push } = useHistory();

  const successHandler = ({ data }) => {
    dispatch({
      type: "ADD_ENTRIES",
      payload: { ...data },
      context: "organization",
    });
    dispatch({
      type: "ADD_ENTRIES",
      payload: false,
      context: "loadingOrg",
    });
  };

  const errorHandler = (err) => {
    dispatch({
      type: "ADD_ENTRIES",
      payload: false,
      context: "loadingOrg",
    });
    if (/\/accounts/.test(pathname)) {
      // window.location.replace(`app.http://localhost:3000`);
    }
  };

  useEffect(() => {
    if (Boolean(subdomain) && !loadingOrg && !Boolean(organization)) {
      dispatch({
        type: "ADD_ENTRIES",
        payload: true,
        context: "loadingOrg",
      });
      axiosAction({
        method: "get",
        endpoint: `/apps-byslug/${subdomain}`,
        successHandler,
        errorHandler,
      });
    }
  }, [subdomain]);

  return [organization, loading || loadingOrg];
}
