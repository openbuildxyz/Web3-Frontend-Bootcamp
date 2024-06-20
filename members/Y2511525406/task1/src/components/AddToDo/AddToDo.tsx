/*
 * @Author: Jacket-mzl
 * @Date: 2024-06-04 16:44:00
 * @LastEditors: Jacket-mzl
 * @LastEditTime: 2024-06-14 23:43:03
 * @Description:
 */
import { Input } from "antd";
import { useState } from "react";
import "./addToDo.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { setToDo } from "../../redux/modules/doThing";
export default function AddToDo() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const toDoArr = useSelector((state: RootState) => state.toDoState.todoArr);
  const onChange = (props: any) => {
    setInputValue(props.target.value);
  };
  const addToDo = () => {
    console.log("我拿到的toDoArr", toDoArr);
    const id = toDoArr.length ? toDoArr[0].id : 1;
    console.log("我拿到的ID是多少", id);
    dispatch(
      setToDo({
        id: id + 1,
        content: inputValue,
        isDone: false,
      })
    );
    console.log("添加完之后的select", toDoArr);
    setInputValue("");
  };
  return (
    <div className="addTodo">
      <div className="addInput">
        <Input
          placeholder="Add To Do List"
          onChange={onChange}
          size="large"
          value={inputValue}
        />
      </div>
      <div className="addBtn" onClick={addToDo}>
        Add
      </div>
    </div>
  );
}
