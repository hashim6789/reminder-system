import Layout from "@/modules/Layout";
import { ProtectedRoute } from "./ProtectedRoute";

export const AdminRoutes = () => {
  return [
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
