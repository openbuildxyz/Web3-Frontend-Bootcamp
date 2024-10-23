import clsx from "clsx";
import type { ITodoType } from "../type/ITodoType";

export default function ToDoItem({
  todoItem,
  toggleFinishState,
  removeTodo,
}: {
  todoItem: ITodoType;
  toggleFinishState: (id: string) => void;
  removeTodo: (id: string) => void;
}) {
  return (
    <div className="bg-indigo-100 flex items-center py-2 text-2xl font-mono justify-between px-4 rounded-lg">
      <label
        htmlFor={todoItem.id}
        className={clsx("w-full cursor-pointer flex items-center gap-2")}
      >
        <input
          id={todoItem.id}
          type="checkbox"
          className="h-5 w-5"
          defaultChecked={todoItem.isFinish}
          onClick={() => toggleFinishState(todoItem.id)}
        />
        <span
          className={clsx(todoItem.isFinish && "line-through text-red-500")}
        >
          {todoItem.todo}
        </span>
      </label>
      <button
        className="w-fit px-4 bg-pink-600 rounded-lg"
        onClick={() => removeTodo(todoItem.id)}
      >
        Remove
      </button>
    </div>
  );
}
