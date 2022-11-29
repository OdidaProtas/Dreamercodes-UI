import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import SuAdmin from "./su-admin";

export function render(url, context) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url} context={context}>
      <SuAdmin />
    </StaticRouter>
  );
}
