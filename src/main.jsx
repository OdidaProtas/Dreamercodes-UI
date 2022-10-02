import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "./state";

import { BrowserRouter } from "react-router-dom";
if (import.meta.env.SSR) {
  ReactDOM.hydrateRoot(
    document?.getElementById("app"),
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
} else {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
