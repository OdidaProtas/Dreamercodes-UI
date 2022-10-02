import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Main from "./main";

export function render(url, context) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url} context={context}>
      <Main />
    </StaticRouter>
  );
}
