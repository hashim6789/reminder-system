export interface ITask {
  id: string;
  title: string;
  description: string | null;
  dueDate: Date;
  createdAt: Date;
}

export const sampleTasks: ITask[] = [
  {
    id: "c1a3e6d2-1f4b-4a9f-9e2f-1a2b3c4d5e6f",
    title: "Plan Project Roadmap",
    description: "Outline key milestones and deliverables",
    dueDate: new Date("2025-09-15T18:00:00Z"),
    createdAt: new Date("2025-09-08T09:00:00Z"),
  },
  {
    id: "d2b4f7e3-2a5c-4b8e-8f3d-2b3c4d5e6f7a",
    title: "Review Code Changes",
    description: "Check PR #123 for bugs",
    dueDate: new Date("2025-09-12T14:00:00Z"),
    createdAt: new Date("2025-09-07T14:30:00Z"),
  },
  {
    id: "e3c5g8f4-3b6d-5c9f-7g4e-3c4d5e6f7a8b",
    title: "Update Documentation",
    description: "Add API endpoints details",
    dueDate: new Date("2025-09-16T10:00:00Z"),
    createdAt: new Date("2025-09-08T08:00:00Z"),
  },
  {
    id: "f4d6h9g5-4c7e-6d0g-6h5f-4d5e6f7a8b9c",
    title: "Conduct Team Meeting",
    description: null,
    dueDate: new Date("2025-09-11T15:00:00Z"),
    createdAt: new Date("2025-09-07T16:00:00Z"),
  },
  {
    id: "a5e7i0h6-5d8f-7e1h-5i6g-5e6f7a8b9c0d",
    title: "Test New Feature",
    description: "Verify login functionality",
    dueDate: new Date("2025-09-14T12:00:00Z"),
    createdAt: new Date("2025-09-08T10:00:00Z"),
  },
];
