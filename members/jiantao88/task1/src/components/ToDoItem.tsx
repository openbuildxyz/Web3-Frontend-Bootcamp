import { List, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { ToDoListProps } from "../models/Todo";

const ToDoItem = ({ todo, deleteTodo, toggleTodo }: ToDoListProps) => (
  <List.Item
    actions={[
      <Button
        type="primary"
        danger
        icon={<DeleteOutlined />}
        onClick={() => deleteTodo(todo.id)}
      >
        删除
      </Button>,
    ]}
  >
    <span
      onClick={() => toggleTodo(todo.id)}
      style={{
        textDecoration: todo.completed ? "line-through" : "none",
        cursor: "pointer",
      }}
    >
      {todo.text}
    </span>
  </List.Item>
);

export default ToDoItem;
