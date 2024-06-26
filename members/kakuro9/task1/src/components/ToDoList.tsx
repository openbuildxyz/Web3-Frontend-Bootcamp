import React from "react";
import ToDoItem from "./ToDoItem";
import { ToDo } from "../types";

interface ToDoListProps {
  items: ToDo[];
  toggleComplete: (id: number) => void;
  deleteToDo: (id: number) => void;
  updateToDo: (id: number, text: string) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({
  items,
  toggleComplete,
  deleteToDo,
  updateToDo,
}) => {
  return (
    <div className="mt-4">
      {items.map((item) => (
        <ToDoItem
          key={item.id}
          item={item}
          toggleComplete={toggleComplete}
          deleteToDo={deleteToDo}
          updateToDo={updateToDo}
        />
      ))}
    </div>
  );
};

export default ToDoList;
