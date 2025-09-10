import { useEffect, useState } from "react";
import { createReminderRuleSchema } from "@/schema";
import {
  createReminderRule,
  fetchAllReminderRules,
  deleteReminderRule,
  updateReminderRule,
  toggleReminderRuleStatus,
} from "@/services";
import { IReminderRule } from "@/types/reminder-rules";
import {
  getAxiosErrorMessage,
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "@/lib";
import { useTasks } from "./use-task";
import { ReminderMessages } from "@/constants";

interface FormData {
  title: string;
  minutesBefore: number;
  taskId: string;
}

export function useReminderRules() {
  const [reminderRules, setReminderRules] = useState<IReminderRule[]>([]);
  const [selectedRule, setSelectedRule] = useState<IReminderRule | null>(null);
  const { tasks } = useTasks();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    minutesBefore: 0,
    taskId: "",
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getReminderRules = async () => {
      try {
        const data = await fetchAllReminderRules();
        setReminderRules(data);
      } catch (error) {
        const message = getAxiosErrorMessage(error);
        console.error(ReminderMessages.FETCH_FAILED, message);
        showErrorToast(message);
      }
    };

    getReminderRules();
  }, []);

  const handleToggle = async (id: string, isActive: boolean) => {
    try {
      const updated = await toggleReminderRuleStatus(id, isActive);
      setReminderRules((prev) =>
        prev.map((rule) => (rule.id === id ? updated : rule))
      );
    } catch (error) {
      const message = getAxiosErrorMessage(error);
      console.error(ReminderMessages.TOGGLE_FAILED, message);
      showErrorToast(message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReminderRule(id);
      setReminderRules((prev) => prev.filter((rule) => rule.id !== id));
    } catch (error) {
      const message = getAxiosErrorMessage(error);
      console.error(ReminderMessages.DELETE_FAILED, message);
      showErrorToast(message);
    }
  };
  const handleEditRule = (rule: IReminderRule) => {
    setSelectedRule(rule);
    setFormData({
      title: rule.title,
      minutesBefore: rule.minutesBefore,
      taskId: rule.task.id.toString(),
    });
    setOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "minutesBefore" ? parseInt(value) || 0 : value,
    }));
    setError(null);
  };

  const handleSubmit = async () => {
    const validation = createReminderRuleSchema.safeParse(formData);
    if (!validation.success) {
      const message =
        validation.error.errors[0].message ||
        ReminderMessages.VALIDATION_FAILED;
      setError(message);
      showWarningToast(message);
      return;
    }

    const selectedTask = tasks.find(
      (task) => task.id.toString() === formData.taskId
    );
    if (!selectedTask || !selectedTask.dueDate) {
      setError(ReminderMessages.TASK_INVALID);
      showWarningToast(ReminderMessages.TASK_INVALID);
      return;
    }

    const now = new Date();
    const dueTime = new Date(selectedTask.dueDate);
    const reminderTime = new Date(
      dueTime.getTime() - formData.minutesBefore * 60000
    );

    if (dueTime < now) {
      setError(ReminderMessages.TASK_DUE_PAST);
      showWarningToast(ReminderMessages.TASK_DUE_PAST);
      return;
    }

    if (reminderTime < now) {
      setError(ReminderMessages.REMINDER_TIME_PAST);
      showWarningToast(ReminderMessages.REMINDER_TIME_PAST);
      return;
    }

    try {
      if (selectedRule) {
        const updated = await updateReminderRule(selectedRule.id, formData);
        setReminderRules((prev) =>
          prev.map((r) => (r.id === updated.id ? updated : r))
        );
        showSuccessToast(ReminderMessages.UPDATE_SUCCESS);
      } else {
        const created = await createReminderRule(formData);
        setReminderRules((prev) => [...prev, created]);
        showSuccessToast(ReminderMessages.CREATE_SUCCESS);
      }

      setFormData({ title: "", minutesBefore: 0, taskId: "" });
      setSelectedRule(null);
      setOpen(false);
      setError(null);
    } catch (err) {
      const message = getAxiosErrorMessage(err);
      setError(message);
      console.error(message);
      showErrorToast(message);
    }
  };

  return {
    reminderRules,
    tasks,
    formData,
    open,
    error,
    selectedRule,
    setOpen,
    handleToggle,
    handleDelete,
    handleEditRule,
    handleInputChange,
    handleSubmit,
  };
}
