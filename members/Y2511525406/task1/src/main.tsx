/*
 * @Author: Jacket-mzl
 * @Date: 2024-06-04 16:31:49
 * @LastEditors: Jacket-mzl
 * @LastEditTime: 2024-06-04 18:43:34
 * @Description:
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
