import Layout from "@/modules/Layout";
import { ProtectedRoute } from "./ProtectedRoute";

export const UserRoutes = () => {
  return [
    {
      path: "/user",
      children: [
        {
          element: <ProtectedRoute role="user" />,
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
