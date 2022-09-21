import { lazy } from "react";
import { useMemo } from "react";
import Navigation from "../../../features/navigation";

const Overview = lazy(() => import("./overview"));
const Add = lazy(() => import("./add"));


function useNavOptions() {
  return useMemo(() => [
    { exact: true, children: <Overview />, route: "" },
    { exact: true, children: <Add />, route: "/article/new" },
  ]);
}

export default function () {
  const navOptionss = useNavOptions();
  return <Navigation options={navOptionss} />;
}
