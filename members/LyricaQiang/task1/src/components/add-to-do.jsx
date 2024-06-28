import { useState } from "react";

function AddTodo({ onAdd }) {
  const [inputVal, setInputVal] = useState("");

  const onSubmit = () => {
    setInputVal("");
    onAdd({ id: Date.now(), text: inputVal, complete: false });
  };

  return (
    <div className="add-wrap">
      <input
        type="text"
        className="inputVal"
        placeholder="请输入"
        value={inputVal}
        onChange={e => setInputVal(e.target.value)}
      />
      <button type="submit" className="button" onClick={onSubmit}>
        增加
      </button>
    </div>
  );
}

export default AddTodo;
