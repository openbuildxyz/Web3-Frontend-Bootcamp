import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrStatusGood } from "react-icons/gr";

export default function TaskList({tasks, onChangeTask, onDeleteTask}) {
    return (
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
          </li>
        ))}
      </ul>
    );
  }
  
  function Task({task, onChange, onDelete}) {
    const [isEditing, setIsEditing] = useState(false);
    let taskContent;
    if (isEditing) {
      taskContent = (
        <>
          <input
            value={task.text}
            onChange={(e) => {
              onChange({
                ...task,
                text: e.target.value,
              });
            }}
          />
          <GrStatusGood onClick={() => setIsEditing(false)}/>
        </>
      );
    } else {
      taskContent = (
        <>
          {task.text}
         <FaRegEdit onClick={() => setIsEditing(true)}/>
        </>
      );
    }
    return (
      <label>
        <input
          type="checkbox"
          checked={task.done}
          onChange={(e) => {
            onChange({
              ...task,
              done: e.target.checked,
            });
          }}
        />
        {taskContent}
        <RiDeleteBin5Line onClick={() => onDelete(task.id)}/>
      </label>
    );
  }
  