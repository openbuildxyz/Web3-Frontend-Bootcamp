import React from "react";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export interface ITodoItem {
  completed: boolean;
  text: string;
  id: number;
}
export const ToDoItem: React.FC<
  {
    markTaskStatus: (v: Omit<ITodoItem, "text">) => void;
    deleteTask: (v: number) => void;
  } & ITodoItem
> = ({ id, completed, text, markTaskStatus, deleteTask }) => {
  const handleChange = (checked: boolean) => {
    markTaskStatus({ id, completed: checked });
  };
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={completed}
          onCheckedChange={handleChange}
          id={`terms-${id}`}
        />
        <label
          htmlFor={`terms-${id}`}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            completed ? "line-through" : ""
          )}
        >
          {text}
        </label>
      </div>

      <Button
        size="icon"
        variant="destructive"
        onClick={() => {
          deleteTask(id);
        }}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};
