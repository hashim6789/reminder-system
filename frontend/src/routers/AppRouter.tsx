import React from "react";

import { UserRoutes } from "./UserRoutes";
import { useRoutes } from "react-router-dom";

const AppRoutes: React.FC = () => {
  const routes = [...UserRoutes()];

  return useRoutes(routes);
};

export default AppRoutes;
