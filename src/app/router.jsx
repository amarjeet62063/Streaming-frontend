import { createBrowserRouter } from "react-router-dom";

import App from "../App";

import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Watch from "../pages/Watch";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
        ],
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/page/:page",
            element: <Home />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/watch",
            element: <Watch />,
          },
        ],
      },
    ],
  },
]);

export default router;
