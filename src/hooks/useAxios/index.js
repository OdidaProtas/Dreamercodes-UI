import { useState } from "react";
import { tryCatch } from "../../utils/utils";

import network from "../../network";
import { useStateValue } from "../../state/hooks";
import { useMemo } from "react";
import useCachedRequests from "../useCachedRequests";

export default function (mode) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const requestCache = useCachedRequests();

  async function axiosAction(options) {
    const {
      endpoint,
      method,
      payload,
      successHandler,
      errorHandler,
      implicitInstance,
    } = options;
    setLoading(true);
    setError(null);
    setSuccess(false);
    const axios_instance =
      network.axiosInstances[implicitInstance ?? mode ?? "courses"];
    axios_instance.interceptors.request.use((config) => {
      if (/\/check_stale/.test(config.url)) return config;
      if (config.method === "post") return config;

      if (requestCache.shouldUpdate(config)) {
        return config;
      }

      if (requestCache.isCached(config)) {
        const skipXHRError = new Error("skip");
        skipXHRError.isSkipXHR = true;
        skipXHRError.request = config;
        throw skipXHRError;
      } else {
        if (Boolean(requestCache.getCachedRequest(config)))
          requestCache.waitForResponse(config);
        return config;
      }
    });
    axios_instance.interceptors.response.use(
      function (response) {
        if (/\/check_stale/.test(response.config.url)) {
          if (response.data.shouldUpdate) {
            requestCache.setShouldUpdate(response.data.which);
          }
          return response;
        }
        requestCache.setCachedResponse(response);
        return response;  
      },
      function (error) {
        if (error.isSkipXHR) {
          return requestCache.getCachedResponse(error.request);
        }
        return Promise.reject(error);
      }
    );
    const request = axios_instance[method](endpoint, payload);
    const [res, err] = await tryCatch(request);
    if (err) {
      setError(err);
      errorHandler(err);
      setLoading(false);
      return;
    }
    setSuccess(true);
    successHandler(res);
    setLoading(false);
  }

  return { axiosAction, loading, error, success };
}
