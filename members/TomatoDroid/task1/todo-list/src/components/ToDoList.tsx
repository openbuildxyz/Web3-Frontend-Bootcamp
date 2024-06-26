import { FC } from 'react';
import { ToDoItem } from './ToDoItem';
import { ToDoListProps } from '../types';

export const ToDoList: FC<ToDoListProps> = ({ toDoList, handleRemove, handleToggle }) => {
  return (
    <div>
      {
        toDoList.length === 0 
        ? <div className='flex justify-center'>
            <span>please add</span>
          </div>
        : toDoList.map((toDo) => {
          return <ToDoItem key={toDo.id} {...toDo} handleRemove={handleRemove} handleToggle={handleToggle}/>
        })
        
      }
    </div>
  );
};
