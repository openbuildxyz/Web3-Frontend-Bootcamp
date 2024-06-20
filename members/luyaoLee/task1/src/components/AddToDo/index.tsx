import { useState } from "react";
import { Task } from "../../interfaces";
import "./index.css";

interface IProps {
  onAdd: (value: Task) => void;
}

const AddToDo: React.FC<IProps> = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;

    const task: Task = {
      id: Date.now(),
      text,
      done: false,
    };

    onAdd(task);
    setText("");
  };

  return (
    <form onSubmit={handler} className="form">
      <input
        type="text"
        className="task-input"
        placeholder="Write down something you wanna do"
        value={text}
        onInput={(e) => setText((e.target as HTMLInputElement).value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddToDo;
