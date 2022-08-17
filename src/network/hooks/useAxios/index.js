import { useState } from "react";
import { axiosInstance } from "../..";
import { tryCatch } from "../../../utils/utils";

export default function () {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  async function axiosAction(options) {
    const { endpoint, method, payload, successHandler, errorHandler } = options;
    setLoading(true);
    setData(null);
    setError(null);
    setSuccess(false);
    const promise = axiosInstance[method](endpoint, payload);
    const [res, err] = await tryCatch(promise);
    if (err) {
      setError(err);
      errorHandler();
      setLoading(false);
      return;
    }
    setData(res);
    setSuccess(true);
    successHandler();
    setLoading(false);
  }

  return { axiosAction, data, loading, error, success };
}
