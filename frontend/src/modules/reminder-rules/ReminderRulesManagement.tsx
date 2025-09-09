import { useReminderRules, useTasks } from "@/hooks";
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

export default function ReminderRulesManagementPage() {
  const {
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
  } = useReminderRules();

  const { tasks } = useTasks();

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Reminder Rules Management
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>
              {selectedRule ? "Edit Rule" : "Create Reminder Rule"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedRule
                  ? "Edit Reminder Rule"
                  : "Create New Reminder Rule"}
              </DialogTitle>
              <DialogDescription>
                {selectedRule
                  ? "Update the rule details below."
                  : "Add a new rule to send reminders for tasks."}
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
                  handleInputChange({
                    target: { name: "taskId", value },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a task from existing rules" />
                </SelectTrigger>
                <SelectContent>
                  {tasks.map((task) => (
                    <SelectItem key={task.id} value={task.id.toString()}>
                      {task.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {selectedRule ? "Update" : "Create"}
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
                    onCheckedChange={(checked) =>
                      handleToggle(rule.id, checked)
                    }
                    aria-label={`Toggle ${rule.task.title} reminder`}
                  />
                </TableCell>
                <TableCell className="font-medium">{rule.task.title}</TableCell>
                <TableCell>
                  {new Date(rule.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditRule(rule)}
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
