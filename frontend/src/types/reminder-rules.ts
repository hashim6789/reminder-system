import { ITask, sampleTasks } from "./task";

export interface IReminderRule {
  id: string;
  title: string;
  task: ITask;
  isActive: boolean;
  minutesBefore: number;
  createdAt: Date;
}

export const sampleReminderRules: IReminderRule[] = [
  {
    id: "rule-1",
    title: "30 Minutes Before",
    task: sampleTasks[0],
    isActive: true,
    minutesBefore: 30,
    createdAt: new Date("2025-09-08T09:00:00Z"),
  },
  {
    id: "rule-2",
    title: "60 Minutes Before",
    task: sampleTasks[1],
    isActive: false,
    minutesBefore: 60,
    createdAt: new Date("2025-09-07T14:00:00Z"),
  },
  {
    id: "rule-3",
    title: "15 Minutes Before",
    task: sampleTasks[2],
    isActive: true,
    minutesBefore: 15,
    createdAt: new Date("2025-09-08T08:00:00Z"),
  },
  {
    id: "rule-4",
    title: "45 Minutes Before",
    task: sampleTasks[3],
    isActive: false,
    minutesBefore: 45,
    createdAt: new Date("2025-09-07T16:00:00Z"),
  },
  {
    id: "rule-5",
    title: "90 Minutes Before",
    task: sampleTasks[4],
    isActive: true,
    minutesBefore: 90,
    createdAt: new Date("2025-09-08T10:00:00Z"),
  },
];
