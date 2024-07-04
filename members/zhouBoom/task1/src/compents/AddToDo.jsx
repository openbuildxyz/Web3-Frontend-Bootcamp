import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';

function AddToDo({ setTodos }) {
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input) {
      setTodos((prev) => [...prev, { text: input, completed: false }]);
      setInput('');
    }
  };

  return (
    <div>
      <TextField value={input} onChange={(e) => setInput(e.target.value)} />
      <Button onClick={addTodo}>
      <AddCircle/>
      </Button>
      {/* <AddIcon style={{ marginLeft: '12px' }} onClick={addTodo}/> */}
    </div>
  );
}

export default AddToDo;
