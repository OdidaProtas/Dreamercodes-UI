import { Redirect, useRouteMatch } from "react-router-dom";
import { useStateValue } from "../../../state/hooks";

export default () => {
  const { onBoarded } = useStateValue();

  const { url } = useRouteMatch();

  if (!onBoarded) return <Redirect to={`${url}/onboarding`} />;
  return <>Portal home</>;
};
