import "../style/add.css";
import { useState } from "react";

function AddComponent({ gettoDoList }) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() === "") return;
    gettoDoList(inputValue);
    setInputValue("");
  };

  return (
    <div className="add-container">
      <input
        type="text"
        placeholder="请输入待办事项"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAdd}>添加</button>
    </div>
  );
}

export default AddComponent;
