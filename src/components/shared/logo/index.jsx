import { useHistory } from "react-router-dom";
import Logo from "../../../assets/vite.svg";

export default () => {
  const { push } = useHistory();
  return (
    <>
      <img
        onClick={() => push("/")}
        style={{ cursor: "pointer" }}
        src={Logo}
        alt=""
      />
    </>
  );
};
