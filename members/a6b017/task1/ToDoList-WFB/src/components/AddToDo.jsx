import React, { useState } from "react";
import { MdAddBox } from "react-icons/md";

export default function AddToDo({onAddTask}) {
  const [text, setText] = useState('');
    return (
     <div className="form">
        <input
          placeholder="请输入待办事项"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
         onClick={() => {
          setText('');
          onAddTask(text);
        }}>新增
        </button>

      </div> 
    );
  }