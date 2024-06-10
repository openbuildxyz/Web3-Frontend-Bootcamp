import { ITask } from "../../types/tasks";
import Task from "./Task";
import React from "react";

interface TodoListProps {
  tasks: ITask[]
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
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
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default TodoList;
