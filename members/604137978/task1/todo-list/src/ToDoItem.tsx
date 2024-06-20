import React from 'react';
import { ToDo } from './types';

interface Props {
  todo: ToDo;
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const ToDoItem: React.FC<Props> = ({ todo, setTodos }) => {
  const deleteToDo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleToDo = (id: number) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        onClick={() => toggleToDo(todo.id)}>
      {todo.text}
      <button onClick={() => deleteToDo(todo.id)}>Delete</button>
    </li>
  );
};

export default ToDoItem;