import React from 'react';
import TodoItem from './todo-item';
import { Todo } from '@/types/todo';

interface TodoListProps {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  toggleStatus: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  deleteTodo,
  toggleStatus
}) => {
  return (
    <div className='flex justify-start flex-col w-1/3'>
      
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleStatus={toggleStatus}
        />
      ))}
    </div>
  );
};

export default TodoList;
