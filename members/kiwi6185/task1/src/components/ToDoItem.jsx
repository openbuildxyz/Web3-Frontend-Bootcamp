import React, { useState } from "react"

function ToDoItem({ item, onDelete, onToggleComplete }) {

  const handleComplete = () => {
    onToggleComplete(item.id);
  };

  const handleDelete = () => {
    setTimeout(() => {
      onDelete(item.id);
    }, 500);  // 0.5s 后被本地数据被删除
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ textDecoration: item.isCompleted ? "line-through" : "none" }}>
        {item.task}
      </span>
      <button onClick={handleComplete} style={{ marginLeft: '10px' }}>
        {item.isCompleted ? 'undone' : 'done'}
      </button>
      <button onClick={handleDelete} style={{ marginLeft: '10px', color: 'red' }}>
        Delete
      </button>
    </div>
  )
}

export default ToDoItem