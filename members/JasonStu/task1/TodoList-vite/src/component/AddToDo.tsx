/*
 * @Author: Jason 373422363@qq.com
 * @Date: 2024-06-04 16:53:40
 * @LastEditors: Jason 373422363@qq.com
 * @LastEditTime: 2024-06-04 20:27:52
 * @FilePath: /Web3-Frontend-Bootcamp/members/github_id/JasonStu/task1/TodoList-vite/src/component/AddToDo.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState } from "react";
import useLocalStorage from "../Tool/localStorage";

interface ToDoItem {
  title: string;
  checked: boolean;
}

const LIST_KEY = "list";

const AddToDo = (props: { onFinish: () => void}) => {
  const [inputValue, setInputValue] = useState("");
  const [List, addToDoItem, updateTodoItem] = useLocalStorage(LIST_KEY);

  return (
    <div style={{minWidth:'250px',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
      <input
      style={{
        width:'100%',
        marginRight:'10px'
      }}
      value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value.trimStart());
        }}
      />
      <button
        onClick={() => {
          if (inputValue.length ===0) {
            return;
          }
          const item: ToDoItem = {
            title: inputValue,
            checked: false,
          };
          addToDoItem(item);
          props.onFinish()
          setInputValue('')
        }}
      >
        ADD
      </button>
    </div>
  );
};

export default AddToDo;
