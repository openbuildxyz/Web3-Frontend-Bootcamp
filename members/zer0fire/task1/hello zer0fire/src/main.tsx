import React from "react";
import ReactDOM from "react-dom/client";
import App from "./todo/app.tsx";
// import "./index.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import "todomvc-app-css/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
