import { ChangeEvent, FC, useState } from "react";
import classes from "./AddToDo.module.css";

// 定义 AddToDo 组件的属性类型
interface AddToDoProps {
  addToDo: (text: string) => void;
}

// AddToDo 组件：包含一个输入框和添加按钮，用于添加新的待办事项。
const AddToDo: FC<AddToDoProps> = ({ addToDo }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddToDo = () => {
    if (inputValue.trim() === "") {
      return;
    }
    addToDo(inputValue);
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
