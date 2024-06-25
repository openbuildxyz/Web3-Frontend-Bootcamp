import ToDoItem from "./ToDoItem";
import { useState } from "react";
function ToDoList(props) {
    
    const taskList = props.tasks.map((task) => (
        <ToDoItem
          id={task.id}
          name={task.name}
          completed={task.completed}
          key={task.id}
          toggleTaskCompleted={props.toggleTaskCompleted}
          deleteTask={props.deleteTask}
          editTask={props.editTask}
        />
      ));
    return <li className="todo">{taskList}</li>;

}
export default ToDoList;