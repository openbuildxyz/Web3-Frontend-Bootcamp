import { type Todo } from "@/types/todo";
import clsx from "clsx";

type TodoProps = {
  todo: Todo;
  toggleStatus: (id: number, checked: boolean) => void;
  deleteTodo: (id: number) => void;
};

const Todo = ({ todo, toggleStatus, deleteTodo }: TodoProps) => {
  const { id, text, isCompleted } = todo;
  return (
    <div className="flex items-center gap-x-2">
      <input
        type="checkbox"
        onChange={(e) => toggleStatus(id, e.currentTarget.checked)}
        checked={isCompleted}
      />
      <span className={clsx(isCompleted && "line-through text-gray-500")}>
        {text}
      </span>
      <button className="h-5 w-5 ml-auto" onClick={() => deleteTodo(id)}>
        x
      </button>
    </div>
  );
};

export default Todo;
