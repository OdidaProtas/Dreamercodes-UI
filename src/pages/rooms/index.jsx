import { lazy, useMemo } from "react";

import Navigation from "../../features/navigation";
import withRoot from "../landingPage/withRoot";
import RoomsLayout from "./components/layout";

import { useSocketActions, useSocketEvent } from "../../features/socket";

const RoomsOverview = lazy(() => import("./overview"));
const AddRoom = lazy(() => import("./add"));

function Rooms() {

  
  const navOptions = useMemo(
    () => [
      { exact: true, children: <RoomsOverview />, route: "" },
      { exact: true, children: <AddRoom />, route: "/new" },
    ],
    []
  );

  const { handleOnlineStatus } = useSocketActions();

  useSocketEvent("connect", handleOnlineStatus);

  return (
    <RoomsLayout>
      <Navigation options={navOptions} />
    </RoomsLayout>
  );
}

export default withRoot(Rooms);
