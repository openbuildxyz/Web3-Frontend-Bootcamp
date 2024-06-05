import { FC } from 'react';
import { ToDoItem } from './ToDoItem';
import { ToDoListProps } from '../types';

export const ToDoList: FC<ToDoListProps> = ({ toDoList, handleRemove, handleToggle }) => {
  return (
    <div>
      {
        toDoList.map((toDo) => {
          return <ToDoItem key={toDo.id} {...toDo} handleRemove={handleRemove} handleToggle={handleToggle}/>
        })
      }
    </div>
  );
};
