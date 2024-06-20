import { useState, useEffect } from 'react';

function AddToDo({ inputValue, setInputValue, handleAddTodo }) {
  return (
  <>
 <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      style={{ padding: '5px', width: '200px', border: '1px solid #ccc', height: '40px' }}
    />
    <button
      onClick={handleAddTodo}
      style={{  padding: '8px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', height: '40px',marginLeft:'15px'}}
    >添加</button>
  </div>
</>
  );
}

export { AddToDo };  