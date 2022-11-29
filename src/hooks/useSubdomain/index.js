import { Window } from "../../utils/utils";

export default function useSubdomain() {
  const sbd = Window.exists()
    ? window.location.host.split(".")[1]
      ? window.location.host.split(".")[0]
      : false
    : false;

  return sbd;
}
