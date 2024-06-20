import { useState } from "react";

function AddToDo({ addItem }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(input);
    setInput("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button type="submit">添加</button>
    </form>
  );
}

export default AddToDo;
