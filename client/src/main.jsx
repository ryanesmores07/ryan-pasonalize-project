import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/index.css";
import { ToastContainer } from "react-toastify";
import "react-image-crop/dist/ReactCrop.css";
import "@radix-ui/themes/styles.css";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
      rel="stylesheet"
    ></link>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
    <ToastContainer position="top-center" />
  </React.StrictMode>
);
