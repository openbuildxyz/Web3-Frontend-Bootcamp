import React, { useState } from "react";

interface AddToDoProps {
  onAdd: (content: string) => void;
}

const AddToDo: React.FC<AddToDoProps> = ({onAdd}) => {
  const [content, setContent] = useState("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  }

  const onClickBtn = () => {
    onAdd(content);
    setContent("");
  }

  return (
    <div>
      <input type="text" value={content} onChange={(e) => onInputChange(e)}></input>
      <button onClick={()=> onClickBtn()}>ADD</button>
    </div>
  )
}
export default AddToDo;