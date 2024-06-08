import { useState } from "react";

export default function AddToDo({
  onAddTodo,
}: {
  onAddTodo: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  return (
    <div>
      <form>
        <input
          className="m-2 h-10 border-2 border-gray-200"
          type="text"
          value={value}
          placeholder="Add a new todo"
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            onAddTodo(value);
            setValue("");
          }}
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}
