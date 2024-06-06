import React from 'react';
import './index.css'

const AddToDo = ({ addItem, inputText, setInputText }) => {
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText!== '') {
      addItem(inputText);
    }
  };

  return (
    <form className="add-to-do-container" onSubmit={handleSubmit}>
      <input className="add-to-do-input" type="text" value={inputText} onChange={handleInputChange} placeholder="Add a to-do..." />
      <button className="add-to-do-button" type="submit">Add</button>
    </form>
  );
};

export default AddToDo;