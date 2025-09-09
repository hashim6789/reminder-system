import Layout from "@/modules/Layout";
import TaskManagement from "@/modules/task/TaskManagement";
import ReminderRulesManagementPage from "@/modules/reminder-rules/ReminderRulesManagement";
import AuditLogsPage from "@/modules/audit-logs/AuditLogsPage";

export const UserRoutes = () => {
  return [
    {
      path: "/",
      children: [
        {
          element: <Layout />,
          children: [
            { path: "", element: <TaskManagement /> },
            { path: "tasks", element: <TaskManagement /> },
            { path: "rules", element: <ReminderRulesManagementPage /> },
            { path: "audit-logs", element: <AuditLogsPage /> },
          ],
        },
      ],
    },
  ];
};
