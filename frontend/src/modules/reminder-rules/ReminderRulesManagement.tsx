import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IReminderRule, sampleReminderRules } from "@/types/reminder-rules";
import { useState } from "react";
import { z } from "zod";

// Zod Schema for form validation
const reminderRuleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  minutesBefore: z.number().min(1, "Minutes must be a positive number"),
  taskId: z.string().min(1, "Please select a task"),
});

export default function ReminderRulesManagementPage() {
  const [reminderRules, setReminderRules] =
    useState<IReminderRule[]>(sampleReminderRules);

  const [formData, setFormData] = useState({
    title: "",
    minutesBefore: 0,
    taskId: "",
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = (id: string, isActive: boolean) => {
    setReminderRules((prevRules) =>
      prevRules.map((rule) => (rule.id === id ? { ...rule, isActive } : rule))
    );
  };

  const handleEdit = (id: string) => {
    // Implement edit logic (e.g., open modal)
    console.log(`Edit rule ${id}`);
  };

  const handleDelete = (id: string) => {
    setReminderRules((prevRules) => prevRules.filter((rule) => rule.id !== id));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "minutesBefore" ? parseInt(value) || 0 : value,
    }));
    setError(null); // Clear error on change
  };

  const handleCreateRule = () => {
    const validation = reminderRuleSchema.safeParse({
      title: formData.title,
      minutesBefore: formData.minutesBefore,
      taskId: formData.taskId,
    });

    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    const selectedTask = sampleReminderRules.find(
      (rule) => rule.task.id.toString() === formData.taskId
    );
    if (selectedTask) {
      const newRule: Omit<IReminderRule, "id" | "task"> & { taskId: number } = {
        title: formData.title,
        taskId: selectedTask.task.id,
        isActive: true,
        minutesBefore: formData.minutesBefore,
        createdAt: new Date(),
      };
      console.log(newRule);

      //   const sample = {
      //     id: "rule-1",
      //     title: "30 Minutes Before",
      //     task: sampleTasks[0],
      //     isActive: true,
      //     minutesBefore: 30,
      //     createdAt: new Date("2025-09-08T09:00:00Z"),
      //   };
      //   setReminderRules((prevRules) => [...prevRules, sample]);
      setFormData({ title: "", minutesBefore: 0, taskId: "" });
      setOpen(false);
      setError(null);
    }
  };
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Reminder Rules Management
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Create Reminder Rule</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Reminder Rule</DialogTitle>
              <DialogDescription>
                Add a new rule to send reminders for tasks.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Reminder Title"
              />
              <Input
                name="minutesBefore"
                type="number"
                value={formData.minutesBefore}
                onChange={handleInputChange}
                placeholder="Minutes Before"
              />
              <Select
                name="taskId"
                value={formData.taskId}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, taskId: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a task" />
                </SelectTrigger>
                <SelectContent>
                  {sampleReminderRules.map((rule) => (
                    <SelectItem
                      key={rule.task.id}
                      value={rule.task.id.toString()}
                    >
                      {rule.task.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="button" onClick={handleCreateRule}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Reminder Title</TableHead>
              <TableHead className="w-[150px]">Minutes Before</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[250px]">Task Title</TableHead>
              <TableHead className="w-[180px]">Created At</TableHead>
              <TableHead className="w-[200px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reminderRules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell className="font-medium">{rule.title}</TableCell>
                <TableCell>{rule.minutesBefore}</TableCell>
                <TableCell>
                  <Switch
                    checked={rule.isActive}
                    onCheckedChange={(checked: boolean) =>
                      handleToggle(rule.id, checked)
                    }
                    aria-label={`Toggle ${rule.task.title} reminder`}
                  />
                </TableCell>
                <TableCell className="font-medium">{rule.task.title}</TableCell>
                <TableCell>
                  {rule.createdAt.toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(rule.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(rule.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
