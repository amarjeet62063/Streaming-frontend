import { createBrowserRouter } from "react-router-dom";

import App from "../App";

import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Watch from "../pages/Watch";
import Upload from "../pages/Upload";
import CreatorProfile from "../features/creators/components/CreatorProfile";

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
          {
            path: "/upload",
            element: <Upload />,
          },
          {
            path: "/profile/:user_id",
            element: <CreatorProfile />,
          },
        ],
      },
    ],
  },
]);

export default router;
