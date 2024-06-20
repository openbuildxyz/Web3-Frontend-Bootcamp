import { Task } from "types";
import { ToDoItem } from "@/components/to-do-item";

type Props = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};
export const ToDoList = ({ tasks, onDelete, onToggle }: Props) => {
  return (
    <div>
      {tasks.map((task) => (
        <ToDoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
