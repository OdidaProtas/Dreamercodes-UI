import React from "react";

import "./index.css";

import ReactDOM from "react-dom/client";
import { Provider as State } from "./state";

import App from "./App";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <State>
        <App />
      </State>
    </BrowserRouter>
  </React.StrictMode>
);
