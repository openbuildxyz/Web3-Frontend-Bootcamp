/*
 * @Author: Jason 373422363@qq.com
 * @Date: 2024-06-04 14:00:18
 * @LastEditors: Jason 373422363@qq.com
 * @LastEditTime: 2024-06-04 20:32:13
 * @FilePath: /Web3-Frontend-Bootcamp/members/github_id/JasonStu/task1/TodoList-vite/src/App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./component/Header";
import TodoList from "./component/ToDoList";
import AddToDo from "./component/AddToDo";
import useLocalStorage from "./Tool/localStorage";
interface ToDoItem {
  title: string;
  checked: boolean;
}

const App = () => {
  const [List, , , getItemList] = useLocalStorage("list");

  const [todoList, setTodoList] = useState<ToDoItem[]>(List);

  const  updateInfo = ()=>{
    const list: ToDoItem[] = getItemList();
    setTodoList(list);
  }

  return (
    <>
      <Header />
      <AddToDo
        onFinish={updateInfo}
      />
      <TodoList
        list={todoList}
      
        onListChange={updateInfo}
      />
    </>
  );
};

export default App;
