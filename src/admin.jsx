import React from "react";

import "./index.css";

import ReactDOM from "react-dom/client";
import { Provider as State } from "./state";

//import App from "./App";

import { Window } from "./utils/utils";
import SuAdmin from "./su-admin";

if (import.meta.env.SSR && Window.exists()) {
  ReactDOM.hydrateRoot(window?.document.getElementById("root")).render(
    <React.StrictMode>
      <State>
        <SuAdmin/>
      </State>
    </React.StrictMode>
  );
}
