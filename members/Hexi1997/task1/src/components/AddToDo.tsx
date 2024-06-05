import { useState } from "react";

interface IAddToDoProps {
  onAdd: (content: string) => void;
}
export function AddToDo(props: IAddToDoProps) {
  const [content, setContent] = useState("");
  const { onAdd } = props;
  return (
    <div className="flex items-center h-12 text-lg gap-x-4 mt-6">
      <input
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        className="w-2/3 h-full rounded-lg outline-none border-[1px] border-solid border-[#272b33] px-4"
        placeholder="Please enter content"
      />
      <button
        onClick={() => {
          if (!content) return;
          onAdd(content);
          setContent("");
        }}
        className="w-1/3 bg-[#ea4c89] text-white rounded-lg h-full duration-200 hover:opacity-95"
      >
        Add
      </button>
    </div>
  );
}
