import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function (values) {
  const [results, setResults] = useState([]);
  const { search } = useLocation();

  function updateValues() {
    let res = [];
    const params = new URLSearchParams(search);
    for (let val of values) {
      const param = params.get(val);
      res.push(param);
    }
    setResults(res);
  }

  useEffect(() => updateValues(), []);

  return results;
}
