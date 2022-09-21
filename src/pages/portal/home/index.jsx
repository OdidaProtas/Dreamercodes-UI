import { Container, LinearProgress } from "@mui/material";
import { lazy } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import Navigation from "../../../features/navigation";
import useOnboardingProfile from "../onboarding/hooks/useOnboardingProfile";

const Overview = lazy(() => import("./overview"));

const navOptions = [{ exact: true, children: <Overview />, route: "" }];

export default () => {
  const { profile, loading } = useOnboardingProfile();
  const { url } = useRouteMatch();
  if (Boolean(profile) && !profile?.hasPrefferedCourse)
    return <Redirect to={`${url}/onboarding`} />;
  return (
    <Container>
      {loading && <LinearProgress />}
      {!loading && <Navigation options={[...navOptions]} />}
    </Container>
  );
};
