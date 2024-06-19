import React, { useRef } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

type AddTodoItemProps = {
  onAdd: (newTodo: TodoItem) => void;
};

type TodoItem = {
  id: number;
  text: string;
  isComplete: boolean;
};

const AddTodo = ({ onAdd }: AddTodoItemProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const add = () => {
    const inputText = inputRef.current?.value.trim();

    if (!inputText) return;

    const newTodo: TodoItem = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    onAdd(newTodo);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center mt-7 bg-gray-200 rounded-full">
      <input
        ref={inputRef}
        type="text"
        placeholder="Add a new item..."
        className="bg-transparent border-0 outline-none flex-1 h-12
                      pl-6 pr-2 placeholder:text-slate-400"
      />
      <button
        onClick={add}
        className="border-none rounded-full bg-blue-400 w-20 h-12
                  text-white flex items-center justify-center"
      >
        <IoMdAddCircleOutline className="w-6 h-6" />
      </button>
    </div>
  );
};

export default AddTodo;
