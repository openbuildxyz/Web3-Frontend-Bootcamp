import { useState } from "react";
import { useLocalStorageState } from "ahooks";

import type { Todo, TodoList } from "@/@types";

type Props = {
  placeholder?: string;
};
const AddTodo: React.FC<Props> = ({
  placeholder = `What do you want to do today?`,
}) => {
  const [inputText, setInputText] = useState("");
  const [todoList = [], setTodoList] = useLocalStorageState<Todo[]>(
    "web3_bootcamp_todoList"
  );

  const handleAdd = (val: string) => {
    if (val.trim() !== "") {
      setTodoList([
        ...(todoList as TodoList),
        {
          id: Date.now(),
          title: val.trim(),
          completed: false,
        },
      ]);
      setInputText("");
    }
  };
  return (
    <div className="w-full flex gap-4 flex-shrink-0">
      <input
        value={inputText}
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-full flex-1"
        autoFocus
        onBlur={(e) => {
          handleAdd(e.target.value);
        }}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAdd(inputText);
        }}
      />

      <button
        className="btn btn-primary flex-shrink-0 w-[130px]"
        onClick={() => {
          handleAdd(inputText);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default AddTodo;
