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
import { showErrorToast, showSuccessToast, showWarningToast } from "@/lib";

interface FormData {
  title: string;
  minutesBefore: number;
  taskId: string;
}

export function useReminderRules() {
  const [reminderRules, setReminderRules] = useState<IReminderRule[]>([]);
  const [selectedRule, setSelectedRule] = useState<IReminderRule | null>(null);
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
        console.error("Failed to fetch reminder rules:", error);
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
      console.error("Failed to toggle reminder rule:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReminderRule(id);
      setReminderRules((prev) => prev.filter((rule) => rule.id !== id));
    } catch (error) {
      console.error("Failed to delete reminder rule:", error);
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
      const message = validation.error.errors[0].message;
      setError(message);
      showWarningToast(message);
      return;
    }

    try {
      if (selectedRule) {
        const updated = await updateReminderRule(selectedRule.id, formData);
        setReminderRules((prev) =>
          prev.map((r) => (r.id === updated.id ? updated : r))
        );
        showSuccessToast("Reminder updated successfully.");
      } else {
        const created = await createReminderRule(formData);
        setReminderRules((prev) => [...prev, created]);
        showSuccessToast("Reminder created successfully.");
      }

      setFormData({ title: "", minutesBefore: 0, taskId: "" });
      setSelectedRule(null);
      setOpen(false);
      setError(null);
    } catch (err) {
      setError("Failed to save reminder rule.");
      console.error(err);
      showErrorToast("Failed to save reminder.");
    }
  };

  return {
    reminderRules,
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
