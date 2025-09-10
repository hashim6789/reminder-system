import { useEffect, useState } from "react";
import { fetchAllTasks } from "@/services";
import { ITask } from "@/types/task";
import { getAxiosErrorMessage } from "@/lib";
import { TaskMessages } from "@/constants";

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
        const message = getAxiosErrorMessage(err);
        console.error(TaskMessages.FETCH_FAILED, message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, []);

  return { tasks, loading, error };
}
