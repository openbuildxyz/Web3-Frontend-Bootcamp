/*
 * @Author: 轻语
 * @Date: 2024-07-11 22:32:53
 * @LastEditors: 轻语
 * @LastEditTime: 2024-07-12 09:13:08
 * @Description: Please enter the description of the file
 */

import { TodoItem } from "./interface";
import styled from "styled-components";

const ToDoItem = ({
  todo,
  onToggle,
  onRemove,
}: {
  todo: TodoItem;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}) => {
  return (
    <StyledToDoItem className={`todo-item ${todo.isCompleted ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onRemove(todo.id)}>Delete</button>
    </StyledToDoItem>
  );
};

const StyledToDoItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ccc;

  &.done span {
    text-decoration: line-through;
    color: #999;
  }

  input {
    margin-right: 8px;
  }

  button {
    margin-left: auto;
    background-color: red;
    color: white;
    border: none;
    padding: 4px 8px;
    cursor: pointer;
    border-radius: 4px;
  }

  button:hover {
    background-color: darkred;
  }
`;

export default ToDoItem;
