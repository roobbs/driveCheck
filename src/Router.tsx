import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./components/auth/AuthContext";
import Index from "./screens/Index";
import Error from "./screens/Error";
import PrivateRoute from "./components/structure/PrivateRoute";
import Home from "./screens/Home";
import Layout from "./components/structure/Layout";
import Maintenance from "./screens/Maintenance";
import Reminders from "./screens/Reminders";
import Fuel from "./screens/Fuel";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
      errorElement: <Error />,
    },
    {
      path: "/",
      element: <PrivateRoute />,
      children: [
        {
          element: <Layout />,
          children: [
            { path: "home", element: <Home /> },
            { path: "maintenance", element: <Maintenance /> },
            { path: "reminders", element: <Reminders /> },
            { path: "fuelRecords", element: <Fuel /> },
          ],
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
