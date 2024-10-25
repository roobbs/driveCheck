import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./components/auth/AuthContext";
import Index from "./screens/Index";
import Error from "./screens/Error";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./screens/Home";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
      errorElement: <Error />,
    },

    {
      path: "/home",
      element: <PrivateRoute />,
      children: [
        { index: true, element: <Home /> },
        // { path: "createBusiness", element: <CreateBusiness /> },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
