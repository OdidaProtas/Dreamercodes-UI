import { useHistory } from "react-router-dom";
import Logo from "../../../assets/images/logo_transparent.png";
import TextLogo from "../../../assets/images/logo_text.png";
export default ({ textOnly }) => {
  const { push } = useHistory();
  return (
    <>
      <img
        width="100"
        onClick={() => push("/")}
        style={{ cursor: "pointer" }}
        src={textOnly ? TextLogo : Logo}
        alt=""
      />
    </>
  );
};
