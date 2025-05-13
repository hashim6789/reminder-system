import { Button } from "@/components/ui/button";
import { showSuccessToast } from "@/lib";
import { useState } from "react";

export default function LandingPage() {
  const [count, setCount] = useState<number>(0);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center p-8 space-y-6">
      <h1 className="text-4xl font-bold">Vite + React + Tailwind + ShadCN</h1>

      <p className="text-lg">
        Tailwind test: <span className="text-blue-500">blue text</span>
      </p>

      <Button onClick={() => setCount(count + 1)}>
        ShadCN Button: Count is {count}
      </Button>

      <Button
        onClick={() => showSuccessToast("sucess")}
        variant="secondary"
        size="sm"
      >
        Secondary Small Button
      </Button>
    </div>
  );
}
