import { useEffect } from "react";
import { useLayoutEffect } from "react";
import useOrg from "../useOrg";

export default function (title) {
  const [org] = useOrg();
  useLayoutEffect(() => {
    document.title = `${title} - ${
      Boolean(org) ? org.name : "Dreamercodes School"
    } `;
  }, [title]);
  useEffect(() => {
    if (Boolean(org)) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.getElementsByTagName("head")[0].appendChild(link);
      }
      link.href = org.imageUrl;
    }
  }, [org]);
}
