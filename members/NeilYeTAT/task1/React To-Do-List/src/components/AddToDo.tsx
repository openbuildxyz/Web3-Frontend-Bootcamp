import { nanoid } from "nanoid";
import { Dispatch, SetStateAction, useRef } from "react";
import { ITodoType } from "../type/ITodoType";

export default function AddToDo({
  todoList,
  setTodoList,
}: {
  todoList: ITodoType[];
  setTodoList: Dispatch<SetStateAction<ITodoType[]>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddTodo = () => {
    const todo = inputRef.current?.value.trim();
    if (todo) {
      const newTodoList: ITodoType[] = [
        ...todoList,
        { todo, isFinish: false, id: nanoid() },
      ];
      setTodoList(newTodoList);
      localStorage.setItem("todo", JSON.stringify(newTodoList));
    } else {
      inputRef.current?.focus();
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <>
      <label className="w-full h-12 flex gap-4">
        <input
          type="text"
          className="w-2/3 h-full text-2xl font-mono px-4 rounded-lg"
          placeholder="回车就可以添加喵~"
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />
        <button
          className="w-1/3 text-2xl bg-green-500 hover:bg-green-400 duration-150 text-white rounded-lg"
          onClick={handleAddTodo}
        >
          Add a Todo
        </button>
      </label>
    </>
  );
}
