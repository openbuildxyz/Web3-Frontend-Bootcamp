import React, { useState } from "react"

function ToDoItem({ item, onDelete }) {

  const [isCompleted, setIsCompleted] = useState(false);
  const [isDeleted, SetIsDeleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(!isCompleted);
  };

  const handleDelete = () => {
    SetIsDeleted(true);
    setTimeout(() => {
      onDelete(item.id);
    }, 500);  // 0.5s 后被本地数据被删除
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ textDecoration: isCompleted ? "line-through" : "none" }}>
        {item.task}
      </span>
      <button onClick={handleComplete} style={{ marginLeft: '10px' }}>
        {isCompleted ? 'undone' : 'done'}
      </button>
      <button onClick={handleDelete} style={{ marginLeft: '10px', color: 'red' }}>
        Delete
      </button>
    </div>
  )
}

export default ToDoItem