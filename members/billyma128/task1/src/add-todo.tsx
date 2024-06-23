import React, { useState } from "react";

function AddTodo({ addTodo }: { addTodo: TodoActions["addTodo"] }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({
      id: new Date().getTime(),
      text: input,
      completed: false,
    });
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center my-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border-2 border-gray-300 p-2 rounded-l-lg focus:outline-none focus:border-blue-500"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">Add</button>
    </form>
  );
}

export default AddTodo;
