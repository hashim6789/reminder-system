export interface IAuditLog {
  id: string;
  message: string;
  type: "reminder" | "delete" | "create" | "update" | "toggle";
  createdAt: Date;
}

export const sampleAuditLogs: IAuditLog[] = [
  {
    id: "log-001",
    message: "User 'muhammed.hashim' created a new reminder rule",
    type: "create",
    createdAt: new Date("2025-09-09T14:20:00Z"),
  },
  {
    id: "log-002",
    message: "Failed to update task due to missing permissions",
    type: "delete",
    createdAt: new Date("2025-09-09T14:45:00Z"),
  },
  {
    id: "log-003",
    message: "Reminder triggered for task 'Send Daily Report'",
    type: "delete",
    createdAt: new Date("2025-09-09T15:00:00Z"),
  },
  {
    id: "log-004",
    message:
      "User 'admin' deleted reminder rule linked to task 'Client Follow-up'",
    type: "delete",
    createdAt: new Date("2025-09-09T15:10:00Z"),
  },
  {
    id: "log-005",
    message: "Attempt to access audit logs without authentication",
    type: "delete",
    createdAt: new Date("2025-09-09T15:30:00Z"),
  },
];
