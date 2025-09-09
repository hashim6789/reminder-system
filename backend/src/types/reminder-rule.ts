export interface IReminderRule {
  id: string;
  title: string;
  minutesBefore: number;
  isActive: boolean;
  taskId: string;
  createdAt: Date;
}

export interface IReminderPopulatedDTO {
  id: string;
  title: string;
  minutesBefore: number;
  isActive: boolean;
  task: {
    id: string;
    title: string;
    dueDate: Date;
  };
  createdAt: Date;
}
