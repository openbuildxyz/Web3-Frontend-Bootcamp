import { useState } from "react";

interface IAddToDoProps {
  onAdd: (content: string) => void;
}

const AddTodo: React.FC<IAddToDoProps> = ({ onAdd }) => {
  const [content, setContent] = useState("");

  return (
    <div className="flex gap-2">
      <input
        value={content}
        className="px-2 rounded border-1 border-[#619c65]"
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="py-1 px-2 rounded-md bg-[#d7eadc] text-[#4b9e5f]"
        onClick={() => {
          onAdd(content);
          setContent("");
        }}
      >
        Add
      </button>
    </div>
  );
};

export default AddTodo;
