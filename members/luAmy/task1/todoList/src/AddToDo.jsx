import { useState } from "react";

function AddToDo({addList}) {
  const [inputValue, setInputValue] = useState('');

  function handleAddList() {
    addList(inputValue)
    setInputValue('')
  }

  return (
    <div className="flex justify-center items-center bg-gray-100 py-2 px-4">
      <input className="flex-1 mr-3 pl-3 rounded-full outline-none" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <div className="flex justify-center items-center cursor-pointer w-7 h-7 rounded-full bg-blue-400 text-white">
        <span className="text-xl" onClick={handleAddList}>+</span>
      </div>
    </div>
  )
}

export default AddToDo
