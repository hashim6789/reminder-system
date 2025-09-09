import { Button } from "@/components/ui/button";
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

export default function ReminderRulesManagementPage() {
  const [reminderRules, setReminderRules] =
    useState<IReminderRule[]>(sampleReminderRules);

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
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Reminder Rules Management
        </h2>
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
