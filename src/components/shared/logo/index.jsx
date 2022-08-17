import { useHistory } from "react-router-dom";
import Logo from "../../../assets/images/logo_transparent.png";

export default () => {
  const { push } = useHistory();
  return (
    <>
      <img
        width="100"
        onClick={() => push("/")}
        style={{ cursor: "pointer" }}
        src={Logo}
        alt=""
      />
    </>
  );
};
