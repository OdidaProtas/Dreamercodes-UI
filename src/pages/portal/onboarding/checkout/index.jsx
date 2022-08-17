import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import actions from "../actions";

export default function () {
  const { handleOnboarded } = actions();
  const { push } = useHistory();
  function handleCheckout() {
    handleOnboarded();
    push("/portal");
  }

  return (
    <>
      checkout page
      <Button onClick={handleCheckout}>Complete</Button>
    </>
  );
}
