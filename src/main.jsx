import React from "react";

import "./index.css";

import ReactDOM from "react-dom/client";
import { Provider as State } from "./state";

import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { Window } from "./utils/utils";

if (import.meta.env.SSR && Window.exists()) {
  ReactDOM.hydrateRoot(window?.document.getElementById("root")).render(
    <React.StrictMode>
      <State>
        <App />
      </State>
    </React.StrictMode>
  );
}

if (!import.meta.env.SSR) {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <BrowserRouter>
        <State>
          <App />
        </State>
      </BrowserRouter>
    </React.StrictMode>
  );
}
