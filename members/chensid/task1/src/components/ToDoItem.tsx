import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type ToDo = {
  text: string;
  completed: boolean;
};
interface ToDoItemProps {
  index: number;
  toDo: ToDo;
  deleteTodo: (index: number) => void;
  toggleComplete: (index: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({
  index,
  toDo,
  deleteTodo,
  toggleComplete,
}) => {
  return (
    <li className="flex flex-row items-center justify-between gap-4">
      <Checkbox
        id={`todo-${index}`}
        checked={toDo.completed}
        onCheckedChange={() => toggleComplete(index)}
      />
      <Label
        htmlFor={`todo-${index}`}
        className={`${
          toDo.completed ? "line-through" : ""
        } flex-1 overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer`}
      >
        {toDo.text}
      </Label>
      <Button onClick={() => deleteTodo(index)}>Delete</Button>
    </li>
  );
};

export default ToDoItem;
