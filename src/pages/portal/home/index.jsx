import { Container } from "@mui/material";
import { lazy } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import Navigation from "../../../features/navigation";
import { useStateValue } from "../../../state/hooks";

const Overview = lazy(() => import("./overview"));

const navOptions = [{ exact: true, children: <Overview />, route: "" }];

export default () => {
  const { onBoarded } = useStateValue();

  const { url } = useRouteMatch();

  if (!onBoarded) return <Redirect to={`${url}/onboarding`} />;
  return (
    <Container>
      <Navigation options={[...navOptions]} />
    </Container>
  );
};
