import React from "react";

import { useState } from "react";

function TodoItem({ id, name, completed, tasks, setTasks }) {
  const [newName, setNewName] = useState("");

  const [isEditing, setEditing] = useState(false);

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  //   function editTask(id, newName) {
  //     const editedTaskList = tasks.map((task) => {
  //       // if this task has the same ID as the edited task
  //       if (id === task.id) {
  //         // Copy the task and update its name
  //         return { ...task, name: newName };
  //       }
  //       // Return the original task if it's not the edited task
  //       return task;
  //     });
  //     setTasks(editedTaskList);
  //   }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function handleChangeName(e) {
    setNewName(e.target.value);
  }

  //   function handleSubmit(e) {
  //     e.preventDefault();
  //     editTask(id, newName);
  //     setNewName("");
  //     setEditing(false);
  //   }

  //   const editingTemplate = (
  //     <form className="stack-small">
  //       <div className="form-group">
  //         <label className="todo-label" htmlFor={id}>
  //           New name for {name}
  //         </label>

  //         <input
  //           id={id}
  //           className="todo-text"
  //           type="text"
  //           value={newName}
  //           onChange={handleChangeName}
  //         />
  //       </div>
  //       <div className="btn-group">
  //         <button
  //           type="button"
  //           className="btn todo-cancel"
  //           onClick={() => setEditing(false)}
  //         >
  //           Cancel
  //           <span className="visually-hidden">renaming {name}</span>
  //         </button>

  //         <button type="submit" className="btn btn__primary todo-edit">
  //           Save
  //           <span className="visually-hidden">new name for {name}</span>
  //         </button>
  //       </div>
  //     </form>
  //   );
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={() => toggleTaskCompleted(id)}
        />
        <label className="todo-label" htmlFor={id}>
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          Edit <span className="visually-hidden">{name}</span>
        </button>

        <button
          type="button"
          className="btn btn__danger"
          onClick={() => deleteTask(id)}
        >
          Delete <span className="visually-hidden">{name}</span>
        </button>
      </div>
      <hr />
      <hr />
    </div>
  );

  // return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
  return <li className="todo">{viewTemplate}</li>;
}

export default TodoItem;
