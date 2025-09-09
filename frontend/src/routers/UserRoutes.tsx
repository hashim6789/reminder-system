import Layout from "@/modules/Layout";
import { ProtectedRoute } from "./ProtectedRoute";
import DashboardPage from "@/modules/dashboard/Dashboard";
import LandingPage from "@/modules/LandingPage";
import TaskManagement from "@/modules/task/TaskManagement";
import ReminderRulesManagementPage from "@/modules/reminder-rules/ReminderRulesManagement";
import AuditLogsPage from "@/modules/audit-logs/AuditLogsPage";

export const UserRoutes = () => {
  return [
    { path: "/", element: <LandingPage /> },

    {
      path: "/user",
      children: [
        {
          element: <ProtectedRoute role="user" />,
          children: [
            {
              element: <Layout />,
              children: [
                { path: "dashboard", element: <DashboardPage /> },
                { path: "tasks", element: <TaskManagement /> },
                { path: "rules", element: <ReminderRulesManagementPage /> },
                { path: "audit-logs", element: <AuditLogsPage /> },
              ],
            },
          ],
        },
      ],
    },
  ];
};
