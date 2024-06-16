import React from 'react';
import Item from './Item';
import { TodoItem } from '../type';

export interface TodoListProps {
  todoItems: TodoItem[];
  toggleCompletion: (id: number) => void;
  deleteTodo: (id: number) => void;
}
const List = ({
  todoItems,
  deleteTodo,
  toggleCompletion,
}: TodoListProps) => {
  return (
    <ul className="p-4 bg-[#efefef]">
      {todoItems.map((todo) => (
        <Item
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleCompletion={toggleCompletion}
        />
      ))}
    </ul>
  );
};

export default List;
