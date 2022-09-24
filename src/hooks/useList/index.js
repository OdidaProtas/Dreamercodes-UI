import { useCallback, useEffect } from "react";
import { useAxios, useToast } from "..";
import { useDispatch, useStateValue } from "../../state/hooks";

export default function (options) {
  const { slug, instance, alias } = options;

  const state = useStateValue();
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const { axiosAction, loading: loadingRequest } = useAxios(instance);
  const items = state[slug];

  const loading = state[`loading_${alias ?? slug}`] || loadingRequest;
  const error = state[`error_${alias ?? slug}`];

  function successHandler(res) {
    const { data } = res;
    if (data) {
      const allData = data.reduce((prev, curr) => {
        prev[curr.id] = curr;
        return prev;
      }, {});
      dispatch({
        type: "ADD_ENTRIES",
        context: alias ?? slug,
        payload: allData,
      });
    }
    dispatch({
      type: "ADD_ENTRIES",
      context: `error_${alias ?? slug}`,
      payload: false,
    });
    dispatch({
      type: "ADD_ENTRIES",
      context: `loading_${alias ?? slug}`,
      payload: false,
    });
  }

  function errorHandler(err) {
    console.error(err);
    dispatch({
      type: "ADD_ENTRIES",
      context: `error_${alias ?? slug}`,
      payload: true,
    });
    dispatch({
      type: "ADD_ENTRIES",
      context: `loading_${alias ?? slug}`,
      payload: false,
    });
    // showToast("error", `An error occured while fetching ${slug} items`);
  }

  function updateItems() {
    axiosAction({
      endpoint: `/${slug}`,
      method: "get",
      successHandler,
      errorHandler,
    });
  }

  useEffect(() => {
    if (!loading) {
      dispatch({
        type: "ADD_ENTRIES",
        context: `loading_${alias ?? slug}`,
        payload: true,
      });
      updateItems();
    }
  }, []);

  const cachedResponses = state["cachedResponses"];

  useEffect(() => {
    // axiosAction({
    //   successHandler() {},
    //   errorHandler() {},
    //   endpoint: `/check_stale/${Object.keys(items ?? {}).length}`,
    //   implicitInstance: instance,
    //   method: "get",
    // });
    // if (cachedResponses) {
    //   if (cachedResponses[`/${slug}`]?.shouldUpdate) {
    //     updateItems();
    //   }
    // }
  }, [cachedResponses]);

  const getItems = useCallback(() => {
    return items;
  }, [items]);

  const getItemsArray = useCallback(() => {
    if (items) {
      const ids = Object.keys(items ?? {});
      return ids.map((id) => items[id]);
    }
    return [];
  }, [items]);

  return {
    getItems,
    getItemsArray,
    [`loading_${alias ?? slug}`]: loading,
    error,
  };
}
