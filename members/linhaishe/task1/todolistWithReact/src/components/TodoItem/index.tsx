import React from 'react';
import './index.scss';

function TodoItem(props: any) {
  const { handleDone, handleDelete, handleEdit, list, id } = props;
  return (
    <div key={id} className={`list ${list.isCompleted ? 'completed' : ''}`}>
      <p> {list.taskName}</p>
      <div className='span-btns'>
        <span
          style={{ opacity: list.isCompleted ? '0' : '1' }}
          onClick={() => handleDone(list)}
          title='completed'
        >
          ✓
        </span>
        <span
          className='delete-btn'
          onClick={() => handleDelete(list.id)}
          title='delete'
        >
          X
        </span>
        <span
          className='edit-btn'
          onClick={() => handleEdit(list)}
          title='edit'
        >
          ↻
        </span>
      </div>
    </div>
  );
}

export default TodoItem;
