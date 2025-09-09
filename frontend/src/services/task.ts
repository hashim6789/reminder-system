import { axiosInstance } from "@/lib";
import { ITask } from "@/types";

export const fetchAllTasks = async (): Promise<ITask[]> => {
  const response = await axiosInstance.get("/tasks");
  return response.data;
};
