import "../App.css";

import { useState } from "react";

interface Props {
  addTodo: (text: string) => void;
}

function AddToDo({ addTodo }: Props) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="添加待办事项"
        style={{ marginBottom: 24 }}
      />
      <button type="submit">添加</button>
    </form>
  );
}

export default AddToDo;
