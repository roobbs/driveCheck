import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./components/auth/AuthContext";
import Index from "./screens/Index";
import Error from "./screens/Error";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
      errorElement: <Error />,
    },

    // {
    //   path: "/profile",
    //   element: <PrivateRoute />,
    //   children: [
    //     { index: true, element: <Profile /> },
    //     { path: "createBusiness", element: <CreateBusiness /> },
    //   ],
    // },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
