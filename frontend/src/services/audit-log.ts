import { axiosInstance } from "@/lib";
import { IAuditLog } from "@/types";

export const fetchAuditLogs = async (): Promise<IAuditLog[]> => {
  const response = await axiosInstance.get(`/audit-logs`);
  return response.data;
};
