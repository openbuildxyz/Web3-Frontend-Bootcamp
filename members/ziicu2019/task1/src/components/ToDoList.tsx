import React from "react";
import ToDoItem from "./ToDoItem";

export interface ToDoItemProps {
  text: string;
  completed: boolean;
}

interface ToDoListProps {
  todoItems: ToDoItemProps[];
  onDeleteTodo: (todoIndex: number) => void;
  onToggleTodo: (todoIndex: number) => void;
  onClearAll: () => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ todoItems, onDeleteTodo, onToggleTodo, onClearAll }) => {
  const handleClearAll = () => {
    onClearAll();
  };

  return (
    <div className="mt-8 px-2 border rounded-md border-cyan-300 hover:border-cyan-200">
      <div className="flex justify-between items-center py-2 border-b border-cyan-300">
        <h2 className="text-left text-xl ">Todo List</h2>
        <button
          className="text-right text-sm text-red-500 border border-red-500 rounded-lg px-2 py-1 hover:bg-red-500 hover:text-white active:bg-red-700"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      </div>
      {todoItems.length > 0 ? (
        todoItems.map((item, index) => (
          <ToDoItem
            key={index}
            index={index}
            text={item.text}
            completed={item.completed}
            onDeleteTodo={onDeleteTodo}
            onToggleTodo={onToggleTodo}
          />
        ))
      ) : (
        <p className="text-center text-lg text-gray-500 py-2">No todo items</p>
      )}
    </div>
  );
};

export default ToDoList;
