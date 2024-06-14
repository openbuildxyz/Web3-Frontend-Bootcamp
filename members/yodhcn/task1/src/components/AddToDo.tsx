import { useState } from "react";

type AddToDoProps = {
  onAdd: (content: string) => void;
};

export default function AddToDo(props: AddToDoProps) {
  const { onAdd } = props;

  const [content, setContent] = useState<string>("");
  return (
    <div className="flex flex-row gap-x-3 py-2">
      <input
        className="input input-md input-bordered w-full min-w-60"
        type="text"
        id="fname"
        name="fname"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <button
        className="btn"
        onClick={() => {
          if (!content) return;
          onAdd(content);
          setContent("");
        }}
      >
        ADD
      </button>
    </div>
  );
}
