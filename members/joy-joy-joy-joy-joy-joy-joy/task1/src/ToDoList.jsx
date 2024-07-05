import React from "react";
import ToDoItem from "./ToDoItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function ToDoList({ todos, deleteTodo, toggleTodo }) {
  return (
    <TransitionGroup component="ul">
      {todos.map((todo, index) => (
        <CSSTransition key={index} timeout={300} classNames="todo">
          <ToDoItem
            todo={todo}
            deleteTodo={() => deleteTodo(index)}
            toggleTodo={() => toggleTodo(index)}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

export default ToDoList;
