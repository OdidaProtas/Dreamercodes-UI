import { useMemo } from "react";
import { lazy } from "react";
import Navigation from "../../../features/navigation";

const Home = lazy(() => import("./overview"));
const Detail = lazy(() => import("./detail"));
const Add = lazy(() => import("./add"));

export default function Apps() {
  const navOptions = useMemo(() => {
    return [
      { exact: true, children: <Home />, route: "" },
      { exact: true, children: <Add />, route: "/new" },
      { exact: true, children: <Detail />, route: "/:id" },
    ];
  }, []);
  return <Navigation options={navOptions} />;
}
