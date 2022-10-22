import { Suspense, useMemo, lazy } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ErrorBoundary from "../../components/shared/errorBoundary";
import Fallback from "../../components/shared/fallback";
import { useAuth, useAxios } from "../../hooks";
import useRoles from "../../hooks/useRoles";
import { useDispatch, useStateValue } from "../../state/hooks";

const AuthFallback = lazy(() => import("../../components/dialogs/loginHelper"));
const AccessFallback = lazy(() =>
  import("../../components/dialogs/accessDeniedHadler")
);

export default function Navigation({ options }) {
  const { path } = useRouteMatch();

  const { userHasRoles } = useRoles();
  const { checkLoginStatus } = useAuth();
  const { axiosAction } = useAxios();

  const dispatch = useDispatch();
  const state = useStateValue();

  const isLoggedIn = checkLoginStatus();

  const navData = useMemo(
    () =>
      (options ?? []).map((option) => ({
        ...option,
        route: `${path}${option.route}`,
      })),
    []
  );

  const routes = useMemo(
    () =>
      navData.map(({ route, exact, children, secure, prefetch }) => {
        if (secure) {
          secure = secure();
          const { roles, loginRequired } = secure;
          if (loginRequired && !isLoggedIn) {
            children = <AuthFallback />;
          }
          if (!userHasRoles(roles) && isLoggedIn) {
            children = <AccessFallback />;
          }
        }

        if (prefetch) {
          prefetch(dispatch, state, axiosAction);
        }

        return (
          <Route exact={exact} key={route} path={route}>
            <ErrorBoundary>
              <Suspense fallback={<Fallback />}>{children}</Suspense>
            </ErrorBoundary>
          </Route>
        );
      }),
    [navData, isLoggedIn, state]
  );
  return <Switch>{routes}</Switch>;
}
