export interface IReminderRule {
  id: string;
  title: string;
  minutesBefore: number;
  isActive: boolean;
  taskId: string;
  createdAt: Date;
}
