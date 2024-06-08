import React from 'react';
import { X } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';

import { type Todo } from '@/types/todo';

interface TodoProps {
  todo: Todo;
  toggleStatus: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, toggleStatus, deleteTodo }) => {
  const { id, text, isCompleted } = todo;
  return (
    <>
      <div className='flex gap-2 items-center'>
        <Checkbox onClick={() => toggleStatus(id)} checked={isCompleted} />
        <span className={ isCompleted ? 'line-through text-gray-500' : '' }>{text}</span>
        <X className='h-5 w-5' onClick={() => deleteTodo(id)}/>
      </div>
    </>
  );
};

export default Todo;
