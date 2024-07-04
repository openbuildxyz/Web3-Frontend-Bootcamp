import { useState } from "react";
import { ToDoItemType } from "../../types/todo";

function AddToDo({ addToDo }: { addToDo: (todo: ToDoItemType) => void }) {
  const [todo, setTodo] = useState("");

  const handleAdd = () => {
    if (!todo.trim()) {
      alert("todo不能为空");
    } else {
      addToDo({ id: Date.now(), todo, state: false });
    }
    setTodo("");
  };
  return (
    <div>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
export default AddToDo;
