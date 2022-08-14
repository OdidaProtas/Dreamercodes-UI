import { useLocation } from "react-router-dom";

export default function (value) {
  const { search } = useLocation();
  return new URLSearchParams(search).get(value);
}
