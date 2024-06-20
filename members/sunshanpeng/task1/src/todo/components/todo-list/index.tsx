import React from 'react';
import ITodoItem, { TodoItem } from '../todo-item';

interface TodoListProps {
  todos: TodoItem[];
  onToggleComplete: (todo: TodoItem) => void;
  onDeleteTodo: (todo: TodoItem) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, onDeleteTodo }) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <ITodoItem todo={todo} key={index} onToggleComplete={onToggleComplete} onDeleteTodo={onDeleteTodo} />
      ))}
    </ul>
  );
};

export default TodoList;
