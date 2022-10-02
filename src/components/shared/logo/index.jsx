import { useHistory } from "react-router-dom";
import Logo from "../../../assets/images/logo_transparent.png";
import TextLogo from "../../../assets/images/logo_text.png";
import useOrg from "../../../hooks/useOrg";
import { CircularProgress } from "@mui/material";
import { useDocTitle } from "../../../hooks";
import useSubdomain from "../../../hooks/useSubdomain";
export default ({ textOnly }) => {
  const { push } = useHistory();
  const subdomain = useSubdomain();
  const [org, loadingOrg] = useOrg();
  useDocTitle("Accounts");
  if (loadingOrg && !Boolean(subdomain)) {
    return <CircularProgress size={69} />;
  }
  return (
    <>
      <img
        width="100"
        onClick={Boolean(org) ? () => {} : () => push("/")}
        style={{ cursor: "pointer" }}
        src={Boolean(org) ? org.imageUrl : textOnly ? TextLogo : Logo}
        alt=""
      />
    </>
  );
};
