import React, { useState } from 'react';
import { ToDo } from './types';

interface Props {
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const AddToDo: React.FC<Props> = ({ setTodos }) => {
  const [text, setText] = useState('');

  const addToDo = () => {
    const newToDo = { id: Date.now(), text, completed: false };
    setTodos(prev => [...prev, newToDo]);
    setText('');
  };

  return (
    <div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addToDo}>Add ToDo</button>
    </div>
  );
};

export default AddToDo;