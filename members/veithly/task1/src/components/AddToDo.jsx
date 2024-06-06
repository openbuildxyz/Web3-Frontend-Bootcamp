import { useState } from 'react';
import PropTypes from 'prop-types';

const AddToDo = ({ addToDo }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addToDo(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new todo"
        className="border rounded p-2 flex-grow mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add</button>
    </form>
  );
};

AddToDo.propTypes = {
  addToDo: PropTypes.func.isRequired,
};

export default AddToDo;
