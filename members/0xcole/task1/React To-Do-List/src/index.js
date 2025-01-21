// 主要用来渲染入口
import React from "react";
import ReactDOM from "react-dom/client"; //用于渲染
import "./index.css";
import Home from "./pages/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));// 入口文件
root.render(<Home />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
