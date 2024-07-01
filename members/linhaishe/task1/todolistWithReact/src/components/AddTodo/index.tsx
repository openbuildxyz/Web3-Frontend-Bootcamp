import React, { useState, useRef, useEffect } from 'react';
import './index.scss';

function AddTodo(props: any) {
  const { inputRef, handleChange, btnRef, addTask } = props;
  return (
    <div className='addTask'>
      <input
        ref={inputRef}
        type='text'
        onChange={handleChange}
        placeholder='Add a task........'
      />
      <button ref={btnRef} onClick={addTask} className='addtask-btn'>
        Add Task
      </button>
    </div>
  );
}

export default AddTodo;
