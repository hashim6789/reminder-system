export interface ITask {
  id: number;
  title: string;
  description: string | null;
  due_date: Date;
  created_at: Date;
}

export const sampleTasks: ITask[] = [
  {
    id: 1,
    title: "Plan Project Roadmap",
    description: "Outline key milestones and deliverables",
    due_date: new Date("2025-09-15T18:00:00Z"),
    created_at: new Date("2025-09-08T09:00:00Z"),
  },
  {
    id: 2,
    title: "Review Code Changes",
    description: "Check PR #123 for bugs",
    due_date: new Date("2025-09-12T14:00:00Z"),
    created_at: new Date("2025-09-07T14:30:00Z"),
  },
  {
    id: 3,
    title: "Update Documentation",
    description: "Add API endpoints details",
    due_date: new Date("2025-09-16T10:00:00Z"),
    created_at: new Date("2025-09-08T08:00:00Z"),
  },
  {
    id: 4,
    title: "Conduct Team Meeting",
    description: null,
    due_date: new Date("2025-09-11T15:00:00Z"),
    created_at: new Date("2025-09-07T16:00:00Z"),
  },
  {
    id: 5,
    title: "Test New Feature",
    description: "Verify login functionality",
    due_date: new Date("2025-09-14T12:00:00Z"),
    created_at: new Date("2025-09-08T10:00:00Z"),
  },
];
