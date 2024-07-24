import React from 'react'
import { ToDo } from './todo';
import ToDoItem from './todoitem';
// import ToDoItem from './todoitem';

interface ToDListProps {
  toDoList: ToDo[];
  deleteToDo: (key: number) => void;
  handleIsDone: (index: number) => void
}

const ToDoList: React.FC<ToDListProps> = ({ toDoList, deleteToDo, handleIsDone}) => {

  return (
    <div>
      {toDoList.map((item, index) => <ToDoItem
        key={index}
        todo={item}
        deleteToDo={deleteToDo}
        handleIsDone={handleIsDone}
      />)}
    </div>
  )
}

export default ToDoList