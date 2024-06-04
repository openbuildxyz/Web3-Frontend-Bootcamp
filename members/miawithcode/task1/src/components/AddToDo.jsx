import { useState } from "react";

const AddToDo = ({ addItem }) => {
  const [item, setItem] = useState("");

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(item);
    setItem("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="w-[260px] rounded-l-md border border-gray-200 px-4 py-2 focus:outline-none"
        value={item}
        onChange={handleChange}
        placeholder="eg. Buy milk"
        autoFocus
      />
      <button
        type="submit"
        className="rounded-r-md bg-black px-8 py-2 text-white"
      >
        Add
      </button>
    </form>
  );
};

export default AddToDo;
