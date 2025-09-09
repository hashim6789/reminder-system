export interface ITask {
  id: string;
  title: string;
  description: string | null;
  dueDate: Date;
  createdAt: Date;
}
