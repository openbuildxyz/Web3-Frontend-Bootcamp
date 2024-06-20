import { FC } from 'react';
import { ToDoItemProps } from '../types';
import { CheckBox } from './CheckBox';

export const ToDoItem: FC<ToDoItemProps> = ({ text, completed, handleRemove, id, handleToggle }) => {
  return (
    <div 
    className='h-10 flex items-center border-base border my-2 border-rounded px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700/50'>
      <CheckBox checked={completed} onChange={() => handleToggle(id) }/>
      <div className={`text-2xl ${completed ? 'decoration-line-through' : ''}`}>{text}</div>
      <div className='flex-auto'/>
      <button
        className='h-5 w-5 flex items-center justify-center' 
        onClick={() => handleRemove(id)}>
          <div className='i-heroicons-x-mark-20-solid text-xl'></div>
      </button>
    </div>
  );
};
