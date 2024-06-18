import React from 'react';
import './index.scss';

function TodoItem(props: any) {
  const { handleDone, handleDelete, list, id, handleRevert } = props;
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
        {list.isCompleted && (
          <span
            className='revert-btn'
            onClick={() => handleRevert(list)}
            title='revert'
          >
            ↻
          </span>
        )}
        <span
          className='delete-btn'
          onClick={() => handleDelete(list.id)}
          title='delete'
        >
          X
        </span>
      </div>
    </div>
  );
}

export default TodoItem;
