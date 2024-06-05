import { FC, useState } from 'react';
import { AddToDoProps } from '../types';

export const AddToDo: FC<AddToDoProps> = ({ addToDo }) => {

  const [userInput, setUserInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const add = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput.trim()) {
      addToDo(userInput);
      setUserInput("");
    }
  };

  return (
    <form onSubmit={add}>
      <input type="text" placeholder='add Todo' value={userInput} onChange={handleChange} />
      <button type='submit'>Add</button>
    </form>
  );
};
