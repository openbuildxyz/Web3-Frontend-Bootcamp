import { useState, FormEvent } from 'react';
import { Item } from './interface'

interface AddToDoProps {
  addToDo: (todo: Item) => void;
}

const AddToDo = ({addToDo}:AddToDoProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text)
      return;
    addToDo({ id: Date.now(), text: text, done: false });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <input
        type='text'
        className='input-text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="添加新的待办事项"
      />
      <button type='submit' className='submit-btn'>添加</button>
    </form>
  );
}

export default AddToDo;