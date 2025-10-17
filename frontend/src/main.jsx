import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Camp from "./Pages/CampPage/Camp.jsx";
import TestLogin from "./Pages/LogininPage/TestLogin.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

let router = createBrowserRouter([
  {
    path: "/",
    Component: TestLogin,
  },
  {
    path: "/map",
    Component: App,
  },
  {
    path: "/camp",
    Component: Camp,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
