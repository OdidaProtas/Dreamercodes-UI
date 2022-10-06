import { Toolbar } from "@mui/material";
import { lazy } from "react";
import { useMemo } from "react";
import Navbar from "../../components/shared/navbar";
import Navigation from "../../features/navigation";
import { useSocketEvent } from "../../features/socket";
import withRoot from "../landingPage/withRoot";
import RoomsLayout from "./components/layout";

const RoomsOverview = lazy(() => import("./overview"));

function Rooms() {
  const navOptions = useMemo(
    () => [{ exact: true, children: <RoomsOverview />, route: "" }],
    []
  );

  useSocketEvent("connect",()=>  console.log("whoa"))

  return (
    <RoomsLayout>
      <Navigation options={navOptions} />
    </RoomsLayout>
  );
}

export default withRoot(Rooms);
