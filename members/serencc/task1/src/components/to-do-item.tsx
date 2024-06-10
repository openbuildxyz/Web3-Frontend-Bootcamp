import { Task } from "types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

type Props = {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};
export const ToDoItem = ({ task, onDelete, onToggle }: Props) => {
  return (
    <div className="h-full rounded-2xl shadow-md flex items-center justify-between p-3 min-h-[64px] min-w-[400px]">
      <div className="flex items-center gap-4 p-2">
        <Checkbox
          checked={task.isCompleted}
          onCheckedChange={() => onToggle(task.id)}
          id={task.id}
          className="w-5 h-5"
        />
        <label
          htmlFor={task.id}
          className="text-lg font-semibold text-neutral-700"
        >
          {task.text}
        </label>
      </div>
      <div className="flex items-center p-2">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
