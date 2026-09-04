import { createBrowserRouter } from "react-router-dom";

import App from "../App";

import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../components/Home";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
        ],
      },
    ],
  },
]);

export default router;
