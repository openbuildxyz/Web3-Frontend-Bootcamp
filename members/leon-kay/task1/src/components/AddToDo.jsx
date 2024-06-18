import React, { useState } from "react";

function AddToDo({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="添加新的待办事项"
        style={{ flexGrow: 1, marginRight: "10px" }}
      />
      <button type="submit">添加</button>
    </form>
  );
}

export default AddToDo;
