import { useEffect, useState } from "react";
import { fetchAllTasks } from "@/services"; // Your API call
import { ITask } from "@/types/task";

export function useTasks() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchAllTasks();
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        setError("Unable to load tasks");
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, []);

  return { tasks, loading, error };
}
