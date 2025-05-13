import Layout from "@/modules/Layout";
import { ProtectedRoute } from "./ProtectedRoute";
import LandingPage from "@/modules/LandingPage";

export const AdminRoutes = () => {
  return [
    { path: "/", element: <LandingPage /> },
    {
      path: "/admin",
      children: [
        {
          element: <ProtectedRoute role="admin" />,
          children: [
            {
              element: <Layout />,
              children: [{ path: "dashboard", element: <></> }],
            },
          ],
        },
      ],
    },
  ];
};
