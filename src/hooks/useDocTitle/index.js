import { useLayoutEffect } from "react";

export default function (title) {
  useLayoutEffect(() => {
    document.title = `${title} - Dreamercodes School`;
  }, [title]);
}
