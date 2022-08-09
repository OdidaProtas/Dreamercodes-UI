import { Suspense, useMemo } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ErrorBoundary from "../../components/shared/errorBoundary";
import Fallback from "../../components/shared/fallback";

export default ({ options }) => {
  const { path } = useRouteMatch();
  const navData = useMemo(
    () =>
      (options ?? []).map(({ route, exact, children }) => ({
        exact,
        children,
        route: `${path}${route}`,
      })),
    []
  );
  return (
    <Switch>
      {navData.map(({ route, exact, children }) => (
        <Route exact={exact} key={route} path={route}>
          <ErrorBoundary>
            <Suspense fallback={<Fallback />}>{children}</Suspense>
          </ErrorBoundary>
        </Route>
      ))}
    </Switch>
  );
};
