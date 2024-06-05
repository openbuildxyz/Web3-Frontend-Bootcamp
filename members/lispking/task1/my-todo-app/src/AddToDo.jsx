import { useState } from "react";

function AddToDo({ addTodo }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;
    addTodo({ id: Date.now(), text: input, completed: false });
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="添加待办事项"
      />
      <button type="submit" className="button">
        添加
      </button>
    </form>
  );
}

export default AddToDo;
