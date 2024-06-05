
import React, { useState } from 'react';

const AddToDo = ({ addToDo }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addToDo(task);
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="添加新的待办事项"
      />
      <button type="submit">添加</button>
    </form>
  );
};

export default AddToDo;
