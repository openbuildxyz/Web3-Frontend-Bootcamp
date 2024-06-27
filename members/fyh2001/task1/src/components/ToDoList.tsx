import { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import AddTodo from "./AddToDo";
import { IToDoItem } from "../types";

const ToDoList: React.FC = () => {
  const [todoList, setTodoList] = useState<IToDoItem[]>([]);

  const onUpdateDoneStatus = (id: string, isDone: boolean) => {
    const newTodoList = [...todoList];
    const todoItem = newTodoList.find((item) => item.id === id);
    if (todoItem) todoItem.isDone = isDone;

    setTodoList(newTodoList);
    saveToLocal(newTodoList);
  };

  const onAdd = (content: string) => {
    const newTodoList = [
      ...todoList,
      {
        id: Date.now().toString(),
        isDone: false,
        content,
      },
    ];

    setTodoList(newTodoList);
    saveToLocal(newTodoList);
  };

  const onDelete = (id: string) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);
    saveToLocal(newTodoList);
  };

  useEffect(() => {
    setTodoList(recoverData());
  }, []);

  return (
    <div>
      <AddTodo onAdd={onAdd} />
      <div className="flex flex-col gap-2">
        {todoList.map((item) => (
          <ToDoItem
            key={item.id}
            data={item}
            onDelete={onDelete}
            onUpdateDoneStatus={onUpdateDoneStatus}
          />
        ))}
      </div>
    </div>
  );
};

const storageKey = "todo-list";
const saveToLocal = (data: IToDoItem[]) => {
  localStorage.setItem(storageKey, JSON.stringify(data));
};
const recoverData = () => {
  return JSON.parse(localStorage.getItem(storageKey) || "[]") as IToDoItem[];
};

export default ToDoList;
