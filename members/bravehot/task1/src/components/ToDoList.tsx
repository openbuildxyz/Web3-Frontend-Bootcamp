import { useLocalStorageState } from "ahooks";

import AddTodo from "./AddToDo";

import type { Todo } from "@/@types";
import TodoItem from "./TodoItem";

const ToDoList: React.FC = () => {
  const [todoList = [], setTodoList] = useLocalStorageState<Todo[]>(
    "web3_bootcamp_todoList",
    {
      listenStorageChange: true,
    }
  );

  const deleteTodo = (id: number) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 flex-1 bg-base-100 overflow-hidden shadow-xl px-4 py-6 ">
      <AddTodo />

      {todoList.length ? (
        <div className="w-full flex flex-col flex-1 overflow-auto border-2 border-gray-700/10 rounded-md">
          {todoList.map((item: Todo) => {
            return <TodoItem data={item} deleteTodo={deleteTodo} />;
          })}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center border-gray-700/10 rounded-md border-2">
          No Data
        </div>
      )}
    </div>
  );
};

export default ToDoList;
