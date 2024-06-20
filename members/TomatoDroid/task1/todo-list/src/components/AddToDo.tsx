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
    <form onSubmit={add} className='flex items-end gap-2 mb-6'>
      <input
        className='flex-1 w-full h-10 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent border-0 text-gray-900 dark:text-white focus:ring-0 focus:outline-none placeholder:font-italic border-b border-primary'
        type="text" placeholder='add Todo' value={userInput} onChange={handleChange} />
      <button 
        className='focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-base gap-x-2.5 px-3.5 py-2.5 shadow-sm text-white dark:text-gray-900 bg-primary hover:bg-primary disabled:bg-primary dark:bg-primary dark:hover:bg-primary dark:disabled:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:focus-visible:outline-primary inline-flex items-center'
        type='submit'>
        Add
      </button>
    </form>
  );
};
