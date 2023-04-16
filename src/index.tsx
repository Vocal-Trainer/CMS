import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import { App } from "./App";
import { AuthProvider } from "./context";
import "./localization/i18next";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
