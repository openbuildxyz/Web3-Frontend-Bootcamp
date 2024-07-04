import { Todo } from "./types";
import closeLogo from "../assets/close.svg";
import { Popconfirm } from "antd";
import "./todoItem.css";

interface ToDoItemProps {
  todoItem: Todo;
  finishTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const ToDoItem = ({ todoItem, finishTodo, deleteTodo }: ToDoItemProps) => (
  <div
    className="todo-item-contain"
    style={{
      opacity: todoItem?.status ? 0.4 : 1,
      textDecoration: todoItem?.status ? "line-through" : "none",
    }}
    onDoubleClick={() => finishTodo(todoItem?.id)}
  >
    <span>{todoItem?.name}</span>
    <div>
      <Popconfirm
        title="請確認是否刪除該代辦"
        onConfirm={() => deleteTodo(todoItem?.id)}
      >
        <img
          className="close-icon"
          src={closeLogo}
          alt="close logo"
          height={16}
          width={16}
        />
      </Popconfirm>
    </div>
  </div>
);

export default ToDoItem;
