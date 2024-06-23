import React from "react";
import "@/TodoList.css";

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}
const TodoItem: React.FC<TodoItemProps> = ({
  id, text, completed, onToggle, onDelete
}) => {
  return (
    <li className="todo-item">
      <div className="todo-item-info" onClick={() => onToggle(id)}>
        <i className={completed? 'completed' : ''}></i>
        <span style={{ textDecoration: completed? "line-through" : "none"}}>{text}</span>
      </div>
      <button onClick={() => onDelete(id)}>删除</button>
    </li>
  )
}

export default TodoItem;