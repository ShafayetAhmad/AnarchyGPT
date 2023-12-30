import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import Homepage from "./Components/Homepage/Homepage";
import GuestHomepage from "./Components/GuestHomepage/GuestHomepage";
import UserHompage from "./Components/UserHomepage/UserHompage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/",
        element: <Homepage></Homepage>,
      },
      {
        path: "/auth/login",
        element: <GuestHomepage></GuestHomepage>,
      },
      {
        path: "/userhome",
        element: <UserHompage></UserHompage>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
