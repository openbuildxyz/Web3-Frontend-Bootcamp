import React from 'react';
import { ToDo } from './types';
import ToDoItem from './ToDoItem';

interface Props {
  todos: ToDo[];
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const ToDoList: React.FC<Props> = ({ todos, setTodos }) => (
  <ul>
    {todos.map(todo => (
      <ToDoItem key={todo.id} todo={todo} setTodos={setTodos} />
    ))}
  </ul>
);

export default ToDoList;