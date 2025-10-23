import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Camp from "./Pages/CampPage/Camp.jsx";
import Login from "./Pages/LogininPage/Login.jsx";
import Signup from "./Pages/SignupPage/Signup.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

let router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/map",
    Component: App,
  },
  {
    path: "/camp",
    Component: Camp,
  },
  {
    path: "/signup",
    Component: Signup,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
