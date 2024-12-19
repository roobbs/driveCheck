import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./components/auth/AuthContext";
import Index from "./screens/Index";
import Error from "./screens/Error";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./screens/Home";
import Layout from "./components/Layout";
import Maintenance from "./screens/Maintenance";
import Reminders from "./screens/Reminders";

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
