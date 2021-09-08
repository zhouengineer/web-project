/* eslint-disable no-unused-vars */
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import $ from "jquery";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./assets/css/base.css";
import "./assets/css/aoyun.css";

import App from "./view/App";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Swiper from "swiper";
import "antd/dist/antd.css";
import "swiper/css/swiper.css";
import "./assets/css/animate.css";
import "video.js/dist/video-js.css";
import "video-react/dist/video-react.css";
// import 'hls.js'
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <App />,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
