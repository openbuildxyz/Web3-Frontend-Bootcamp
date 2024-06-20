import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  onAdd: (data: string) => void;
};
export const AddToDo = ({ onAdd }: Props) => {
  const [taskText, setTaskText] = useState("");

  const handleAddToDo = () => {
    if (!taskText) return;
    if (taskText.trim()) {
      onAdd(taskText);
      setTaskText("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") handleAddToDo();
  };

  return (
    <div className="flex items-center justify-center w-full max-w-sm space-x-4">
      <Input
        value={taskText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Please add a new task"
      />
      <Button onClick={handleAddToDo}>Add A Task</Button>
    </div>
  );
};
