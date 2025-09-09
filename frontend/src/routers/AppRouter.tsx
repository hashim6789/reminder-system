import React from // , { useEffect }
"react";

// import { AdminRoutes } from "./AdminRoutes";
import { UserRoutes } from "./UserRoutes";
// import { useAuthStore } from "@/store/useAuthStore";
import {
  // Navigate,
  useRoutes,
} from "react-router-dom";
// import LoginPage from "@/modules/login/LoginPage";

const AppRoutes: React.FC = () => {
  // const { user, fetchMe } = useAuthStore();

  // useEffect(() => {
  //   fetchMe();
  // }, [fetchMe]);

  const routes = [
    // ...AdminRoutes(),
    ...UserRoutes(),
    // {
    //   path: "/login",
    //   element: user ? (
    //     <Navigate to={`/${user.role}/dashboard`} />
    //   ) : (
    //     <LoginPage />
    //   ),
    // },
    // {
    //   path: "/",
    //   element: user ? (
    //     <Navigate to={`/${user.role}/dashboard`} />
    //   ) : (
    //     <LoginPage />
    //   ),
    // },

    // {
    //   path: "/blocked",
    //   element: <BlockedPage />,
    // },
    // {
    //   path: "/500",
    //   element: <ServerErrorPage />,
    // },
    // { path: "*", element: <NotFoundPage /> },
  ];

  return useRoutes(routes);
};

export default AppRoutes;
