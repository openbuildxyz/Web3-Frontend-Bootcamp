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
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            onAddTodo(value);
            setValue("");
          }}
        >
          Add todo
        </button>
      </form>
    </div>
  );
}
