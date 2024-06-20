import { useEffect, useRef } from "react";

type AddTodoProps = {
  addTodo: (text: string) => void;
};

const AddTodo = ({ addTodo }: AddTodoProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAddTodo = () => {
    if (inputRef.current) {
      addTodo(inputRef.current.value.trim());
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAddTodo();
  };

  return (
    <div className="flex gap-2 mx-auto w-[400px]">
      <input
        onKeyUp={onKeyUp}
        className="flex-1 px-2 py-1 border rounded-md"
        ref={inputRef}
      />
      <button
        type="submit"
        className="border px-2 py-1 rounded-md"
        onClick={handleAddTodo}
      >
        添加
      </button>
    </div>
  );
};

export default AddTodo;
