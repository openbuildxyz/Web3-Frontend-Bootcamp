import { FC } from "react";
import ToDoItem from "./ToDoItem";

interface TodoListProps {
  todos: {
    id: string;
    text: string;
  }[];
  handleDeleteTodoItem: (todoId: string) => void;
}

const ToDoList: FC<TodoListProps> = ({ todos, handleDeleteTodoItem }) => {
  return (
    <div className="flex justify-center items-center flex-col gap-4 mt-4">
      {todos.map((todoItem) => (
        <ToDoItem
          key={todoItem.id}
          id={todoItem.id}
          text={todoItem.text}
          handleDeleteTodoItem={handleDeleteTodoItem}
        ></ToDoItem>
      ))}
    </div>
  );
};

export default ToDoList;
