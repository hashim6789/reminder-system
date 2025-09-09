import { axiosInstance } from "@/lib";
import { CreateReminderRule } from "@/schema";
import { IReminderRule } from "@/types";

export const createReminderRule = async (
  data: CreateReminderRule
): Promise<IReminderRule> => {
  const response = await axiosInstance.post("/reminder-rules", data);
  return response.data;
};

export const fetchAllReminderRules = async (): Promise<IReminderRule[]> => {
  const response = await axiosInstance.get("/reminder-rules");
  return response.data;
};

export const updateReminderRule = async (
  id: string,
  data: Partial<CreateReminderRule>
): Promise<IReminderRule> => {
  const response = await axiosInstance.put(`/reminder-rules/${id}`, data);
  return response.data;
};

export const deleteReminderRule = async (
  id: string
): Promise<{ success: boolean }> => {
  const response = await axiosInstance.delete(`/reminder-rules/${id}`);
  return response.data;
};

export const toggleReminderRuleStatus = async (
  id: string,
  isActive: boolean
): Promise<IReminderRule> => {
  const response = await axiosInstance.patch(`/reminder-rules/${id}`, {
    isActive,
  });
  return response.data;
};
