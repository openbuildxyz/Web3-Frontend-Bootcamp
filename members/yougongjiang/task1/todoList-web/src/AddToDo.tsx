import { useState } from 'react';
import { ToDoItemType } from './App';
interface AddToDoProps {
    addTodo: (todo: ToDoItemType) => void;
  }
  
const AddToDo: React.FC<AddToDoProps> = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo({
        id: Date.now(),
        text: inputValue,
        completed: false
      });
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Add ToDo</button>
    </form>
  );
};

export default AddToDo;
