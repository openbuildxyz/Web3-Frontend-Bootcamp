import React, { useEffect } from "react";
import ToDoItem from "./ToDoItem";
import useTaskStore from '../store/index';

const ToDoList: React.FC = () => {
  const tasks = useTaskStore(state => state.tasks);
  const refreshFlag = useTaskStore(state => state.refreshFlag);
  const getAllTodos = useTaskStore(state => state.getAllTodos);
  
  useEffect(() => {
    getAllTodos();
    
  }, [refreshFlag, getAllTodos]);
  
  return (
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
          <tr>
            <th>任务</th>
            <th>行为</th>
          </tr>
          </thead>
          <tbody>
          {tasks.map(task => (
              <ToDoItem key={task.id} task={task} />
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default ToDoList;
