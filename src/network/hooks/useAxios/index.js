import { useState } from "react";
import { axiosInstance } from "../..";
import { tryCatch } from "../../../utils/utils";

export default function () {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  async function axiosAction(options) {
    const { endpoint, method, payload, successHandler, errorHandler } = options;
    setLoading(true);
    setError(null);
    setSuccess(false);
    const promise = axiosInstance[method](endpoint, payload);
    const [res, err] = await tryCatch(promise);
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
