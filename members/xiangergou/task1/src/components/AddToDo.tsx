/*
 * @Author: 轻语
 * @Date: 2024-07-11 22:33:01
 * @LastEditors: 轻语
 * @LastEditTime: 2024-07-12 09:17:41
 * @Description: Please enter the description of the file
 */

import { useState } from "react";
import styled from "styled-components";
import { TodoItem } from "./interface";

const AddToDo = ({ onAddTodo }: { onAddTodo: (todo: TodoItem) => void }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() === "") {
      return;
    }
    const todo: TodoItem = {
      id: Date.now(),
      text: newTodo,
      isCompleted: false,
    };
    onAddTodo(todo);
    setNewTodo("");
  };

  return (
    <StyledAddToDo>
      <input
        type="text"
        placeholder="Enter a new task"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
    </StyledAddToDo>
  );
};

const StyledAddToDo = styled.div`
  display: flex;
  gap: 10px;

  input {
    flex: 1;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 8px 16px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
`;

export default AddToDo;
