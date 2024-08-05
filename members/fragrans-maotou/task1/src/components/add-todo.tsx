import { useState } from "react";

type AddToDoType = {
  addToDo: Function
}
const AddToDo: React.FC<AddToDoType> = ({ addToDo }) => {

  const [inputValue, setInputValue] = useState("");

  const handleAddToDo = () => {
    const todo = {
      id: Date.now(),
      text: inputValue,
      isCompleted: false
    }
    addToDo(todo);
    setInputValue("");
  }

  return (
    <div className="flex">
      <input type="text" className="border" placeholder="新清单" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button onClick={handleAddToDo}>添加</button>
    </div>
  )
}

export default AddToDo;