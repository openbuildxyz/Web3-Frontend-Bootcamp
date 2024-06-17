import React, { useState } from "react";
import classes from "./AddToDo.module.css";

// AddToDo 组件：包含一个输入框和添加按钮，用于添加新的待办事项。
const AddToDo = (props: { addToDo: (text: string) => void }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddToDo = () => {
    const text = inputValue;
    console.log(text, "addToDo");

    // 调用父组件的 addToDo 方法，将输入框中的文本作为参数传递过去
    props.addToDo(text);
    setInputValue(""); // 清空输入框状态
  };
  return (
    <div className={classes.container}>
      <input
        className={classes.input}
        type="text"
        placeholder="输入新的待办事项"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className={classes.button} onClick={handleAddToDo}>
        添加
      </button>
    </div>
  );
};

export default AddToDo;
