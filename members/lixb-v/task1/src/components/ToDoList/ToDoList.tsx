import React from 'react';

interface ToDoListProps {
  children: React.ReactNode;
}

export const ToDoList: React.FC<ToDoListProps> = ({ children }) => {
  return <ul className="mt-4">{children}</ul>;
};

ToDoList.displayName = 'ToDoList';
