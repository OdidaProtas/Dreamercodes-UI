import { useCallback } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAxios, useToast } from "..";
import { useDispatch, useStateValue } from "../../state/hooks";

export default function (options) {
  const { slug, instance, itemId } = options;
  const { id } = itemId ?? useParams();

  const state = useStateValue();
  const dispatch = useDispatch();
  const { axiosAction, loading: loadingRequest } = useAxios(instance);

  const items = state[slug];
  const error = state[`error_${slug}_item`] || state[`error_${slug}`];

  const loading =
    state[`$loading_${slug}`] ||
    state[`$loading_${slug}_item`] ||
    loadingRequest;

  const getItem = useCallback(() => {
    if (items) return items[id];
    return null;
  }, [items]);

  const successHandler = (res) => {
    const { data } = res;
    if (data) {
      const allData = { ...items, [data.id]: data };
      dispatch({
        type: "ADD_ENTRIES",
        context: `${slug}`,
        payload: { ...allData },
      });
      dispatch({
        type: "ADD_ENTRIES",
        context: `error_${slug}_item`,
        payload: false,
      });
    }
    dispatch({
      type: "ADD_ENTRIES",
      context: `loading_${slug}_item`,
      payload: false,
    });
  };

  const errorHandler = (err) => {
    dispatch({
      type: "ADD_ENTRIES",
      context: `loading_${slug}_item`,
      payload: false,
    });
    dispatch({
      type: "ADD_ENTRIES",
      context: `error_${slug}_item`,
      payload: true,
    });
    console.error(err);
  };

  const updateItem = () => {
    axiosAction({
      successHandler,
      errorHandler,
      endpoint: `/${slug}/${id}`,
      method: "get",
    });
  };

  useEffect(() => {
    if (Boolean(id)) {
      const item = (items ?? {})[id];
      if (!loading && !Boolean(item)) {
        dispatch({
          type: "ADD_ENTRIES",
          context: `loading_${slug}_item`,
          payload: true,
        });
        updateItem();
      }
    }
  }, []);

  return {
    getItem,
    [`loading_${slug}_item`]: loading,
    [`${slug}_item`]: getItem,
    error,
  };
}
