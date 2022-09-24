import { useCallback } from "react";
import { useDispatch, useStateValue } from "../../state/hooks";

export default function () {
  const { cachedRequests, cachedResponses } = useStateValue();

  const dispatch = useDispatch();

  const setCachedResponse = useCallback(
    (response) => {
      dispatch({
        type: "ADD_ENTRIES",
        payload: { ...cachedResponses, [response.config.url]: response },
        context: "cachedResponses",
      });
    },
    [cachedRequests, cachedResponses]
  );
  const setCachedRequest = useCallback(
    (config) => {
      dispatch({
        type: "ADD_ENTRIES",
        payload: { ...cachedRequests, [config.url]: config },
        context: "cachedRequests",
      });
    },
    [cachedRequests, cachedResponses]
  );
  const getCachedRequest = useCallback(
    (config) => {
      if (!Boolean(cachedRequests)) return null;
      else cachedRequests[config.url];
    },
    [cachedRequests, cachedResponses]
  );
  const getCachedResponse = useCallback(
    (request) => {
      if (!Boolean(cachedResponses)) return null;
      else cachedResponses[request.config.url];
    },
    [cachedRequests, cachedResponses]
  );
  const waitForResponse = useCallback(
    (config) => {
      dispatch({
        type: "ADD_ENTRIES",
        payload: {
          ...cachedResponses,
          [config.url]: { ...config, isThrottled: true },
        },
        context: "cachedResponses",
      });
    },
    [cachedRequests]
  );
  const isCached = useCallback(
    (config) => {
      if (!Boolean(cachedResponses)) return false;
      return Boolean(cachedResponses[config.url]);
    },
    [cachedResponses]
  );

  const setShouldUpdate = useCallback(
    (url) => {
      dispatch({
        type: "ADD_ENTRIES",
        payload: {
          ...cachedResponses,
          [url]: { ...cache, shouldUpdate: true },
        },
        context: "cachedResponses",
      });
    },
    [cachedResponses]
  );

  const shouldUpdate = useCallback(
    function (config) {
      if (!Boolean(cachedResponses)) return true;
      return Boolean(cachedResponses[config.url]?.shouldUpdate);
    },
    [cachedResponses]
  );

  return {
    setCachedResponse,
    setShouldUpdate,
    getCachedResponse,
    waitForResponse,
    isCached,
    setCachedRequest,
    getCachedRequest,
    shouldUpdate,
  };
}
