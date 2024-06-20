import { List } from "antd";
import ToDoItem from "./ToDoItem";
import { ToDoListProps } from "../models/Todo";

const ToDoList = ({ todos, deleteTodo, toggleTodo }: ToDoListProps) => (
  <List
    bordered
    dataSource={todos}
    renderItem={(todo) => (
      <ToDoItem
        key={todo.id}
        todo={todo}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
        todos={[]}
      />
    )}
  />
);

export default ToDoList;
