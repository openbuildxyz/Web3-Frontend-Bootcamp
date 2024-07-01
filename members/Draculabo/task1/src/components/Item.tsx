import React from 'react';
import { TodoItem } from '../type';
import { TodoListProps } from './List';
import { cn } from "../utils/cn";

export interface TodoItemProps
  extends Pick<TodoListProps, 'toggleCompletion' | 'deleteTodo'> {
  todo: TodoItem;
}
const Item = ({ todo, deleteTodo, toggleCompletion }: TodoItemProps) => {
  return (
    <li
      className={cn(`flex justify-between items-center p-4 bg-white rounded-lg [&:not(:first-child)]:mt-2 `, todo.completed ? 'text-gray-500' : '')}
    >
      <span
        onClick={() => toggleCompletion(todo.id)}
        className={cn(`cursor-pointer`, todo.completed ? 'line-through' : '')}
      >
        {todo.title}
      </span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-500 hover:text-red-500 hover:border-red-500"
      >
        删除
      </button>
    </li>
  );
};

export default Item;
