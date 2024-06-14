// src/components/ToDoItem.tsx

import React, { useState, useRef, useEffect } from "react";
import type { TodoItemProps } from '../TodoList' 
import CheckedIcon from "../assets/checked.svg";
import UncheckedIcon from "../assets/unchecked.svg";
import EditIcon from "../assets/edit.svg";
import DeleteIcon from "../assets/delete.svg";

function TodoItem({ item, todos, setTodos }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const completeTodo = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id
          ? { ...todo, is_completed: !todo.is_completed }
          : todo
      )
    );
  };
  useEffect(() => {
    // Update localStorage after marking todo as completed
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleEdit = () => {
    setEditing(true);
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();

      // position the cursor at the end of the text
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [editing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id ? { ...todo, title: e.target.value } : todo
      )
    );
  };

  const handleInpuSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Update localStorage after editing todo
    const updatedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", updatedTodos);

    setEditing(false);
  };

  const handleInputBlur = () => {
    // Update localStorage after editing todo
    const updatedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", updatedTodos);

    setEditing(false);
  };

  const handleDelete = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));

    // Update localStorage after deleting todo
    const updatedTodos = JSON.stringify(
      todos.filter((todo) => todo.id !== item.id)
    );
    localStorage.setItem("todos", updatedTodos);
  };

  return (
    <li id={item?.id} className="todo_item">
      {editing ? (
        <form className="edit-form" onSubmit={handleInpuSubmit}>
          <label htmlFor="edit-todo">
            <input
              ref={inputRef}
              type="text"
              name="edit-todo"
              id="edit-todo"
              defaultValue={item?.title}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
          </label>
        </form>
      ) : (
        <>
          <button className="todo_items_left" onClick={completeTodo}>
            <img
              src={item.is_completed ? CheckedIcon : UncheckedIcon}
              width={32}
              height={32}
              alt="Checkbox"
            />
            <p
              style={
                item.is_completed ? { textDecoration: "line-through" } : {}
              }
            >
              {item?.title}
            </p>
          </button>
          <div className="todo_items_right">
            <button onClick={handleEdit}>
              <img src={EditIcon} width={32} height={34} alt="Edit" />
            </button>
            <button onClick={handleDelete}>
              <img src={DeleteIcon} width={32} height={34} alt="Delete" />
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;
