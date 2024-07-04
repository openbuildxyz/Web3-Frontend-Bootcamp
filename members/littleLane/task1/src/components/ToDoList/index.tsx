import type { ToDoEntity } from "../../interfaces";
import ToDoItem from "../ToDoItem";

interface ToDoListProps {
  list: ToDoEntity[];
  onDeleteTodo: (name: string) => void;
  onFinish: (name: string) => void;
}

export default function ToDoList({
  list,
  onDeleteTodo,
  onFinish,
}: ToDoListProps) {
  return (
    <ul>
      {list.map((item) => (
        <ToDoItem
          key={item.name}
          todo={item}
          onDeleteTodo={onDeleteTodo}
          onFinish={onFinish}
        />
      ))}
    </ul>
  );
}
