import ReactDOM from "react-dom";

import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

// ✅ GLOBAL VARIABLES

// ✅ RENDER APP
const container = document.getElementById("root");

if (container) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    container
  );
} else {
  console.error("Root element not found");
}
