import { useEffect, useState } from "react";
import Header from "./modules/Header";
import { setLocalStorage, getLocalStorage } from "./utils.js";

import "./App.css";
import AddToDo from "./modules/AddToDo";
import ToDoList from "./modules/ToDoList";

const localName = "TODOTHINGS";

function App() {
  const [todoList, setTodoList] = useState([]);
  const title = "随风小记";
  // 待完成
  const _todoList = [];
  // 已完成
  const _doingList = [];
  todoList.forEach((element) => {
    if (element?.isFinish) {
      _doingList.push(element);
    } else {
      _todoList.push(element);
    }
  });

  useEffect(() => {
    const todoThings = getLocalStorage(localName) ;
    setTodoList(todoThings);
  }, []);

  // 保存数据
  const saveData = (data) => {
    setTodoList(data);
    setLocalStorage(localName, data);
  };

  const onAdd = (thing: string) => {
    const newTodoList = [
      ...todoList,
      {
        thing: thing,
        id: new Date().valueOf(),
      },
    ];
    saveData(newTodoList);
  };

  const onChange = (id, isFinish) => {

    const changeData = todoList.map((item) => {
      if (item.id === id) {
        item.isFinish = isFinish;
      }
      return item;
    });
    saveData(changeData);
  };

  const onDelete = (id) => {
    const deleteData = todoList.filter((item) => item.id !== id);
    saveData(deleteData);
  };

  const listData = [
    {
      title: "待完成",
      dataSource: _todoList,
    },
    {
      title: "已完成",
      dataSource: _doingList,
    },
  ];

  return (
    <div>
      <Header title={title} />
      <AddToDo onAdd={onAdd} />
      <div className="toDoBody">
        {listData.map((item) => {
          const { title, dataSource } = item;
          return (
            <div className="toDoBodyItem">
              <div className="toDoBodyTitle">{title}</div>
              <ToDoList
                dataSource={dataSource}
                onChange={onChange}
                onDelete={onDelete}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
