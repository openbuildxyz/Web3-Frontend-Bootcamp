/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from "react";

import Header from "./components/Header";
import AddToDo from "./components/AddToDo";
import ToDoList from "./components/ToDoList";

import "./App.css";

function App() {
  const [data, setData] = useState<{ value: string; todo: boolean }[]>(
    // @ts-expect-error
    JSON.parse(localStorage.getItem("todo")) || []
  );

  // 添加todo
  const addList = (val: string) => {
    setData((preState: { value: string; todo: boolean }[]) => {
      const index = preState.findIndex((el) => el?.value === val);
      if (index > -1) {
        window.confirm("事项已存在！！");
        return preState;
      } else {
        return [...preState, { value: val, todo: false }];
      }
    });
  };

  // 删除todo
  const deleteItem = (val: string) => {
    setData((preState: { value: string; todo: boolean }[]) => {
      const _preState: { value: string; todo: boolean }[] = JSON.parse(
        JSON.stringify(preState)
      );
      const index = _preState.findIndex((el) => el?.value === val);
      _preState.splice(index, 1);
      return _preState;
    });
  };

  // 更改todo状态
  const changeStatus = (val: string, status: boolean) => {
    setData((preState) => {
      const _preState: { value: string; todo: boolean }[] = JSON.parse(
        JSON.stringify(preState)
      );
      const index = _preState.findIndex((el) => el?.value === val);
      _preState[index].todo = status;
      return _preState;
    });
  };

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(data));
  }, [data]);

  return (
    <>
      <Header title="Todo List" />
      <AddToDo setDataList={addList} />
      <ToDoList
        data={data}
        deleteItem={deleteItem}
        changeStatus={changeStatus}
      />
    </>
  );
}

export default App;
