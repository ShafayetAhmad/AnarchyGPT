import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import Homepage from "./Components/Homepage/Homepage";
import GuestHomepage from "./Components/GuestHomepage/GuestHomepage";
import UserHompage from "./Components/UserHomepage/UserHompage";
import AuthProvider from "./Components/AuthProvider/AuthProvider";
import ConversationPage from "./Components/UserHomepage/ConversationPage/ConversationPage";

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
        path: "/chat",
        element: <UserHompage></UserHompage>,
        children: [
          {
            path: "/chat/:id",
            element: <ConversationPage></ConversationPage>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
