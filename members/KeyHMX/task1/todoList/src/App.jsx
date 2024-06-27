import "./App.css";
import Header from "./components/Header";
// import TodoItem from "./components/ToDoItem";
import AddTodo from "./components/AddToDo";
import TodoList from "./components/ToDoList";
import { useEffect, useState } from "react";
// import PropTypes from "prop-types";
function App() {
  const initialTodos = JSON.parse(localStorage.getItem("todos")) || []; //初始化

  const [whole, setWhole] = useState(initialTodos);
  const generateId = () => Math.random().toString(36).substr(2, 9);
  const addItem = (newItem) => {
    const newer = { id: generateId(), todo: newItem, done: false }; //定义新对象形式，等会儿删除的时候根据id来删除
    const newSetTodos = [...whole, newer];
    setWhole(newSetTodos);
    console.log(whole);
    localStorage.setItem("todos", JSON.stringify(newSetTodos)); //每次更新就保存
  };
  const handleDeleteItem = (id) => {
    const newWhole = whole.filter((item) => item?.id !== id);
    console.log("yo", newWhole);
    console.log("Deleted item at index:", id);
    setWhole(newWhole);
    localStorage.setItem("todos", JSON.stringify(newWhole)); //每次更新就保存
  };
  const handleToggle = (id) => {
    const newWhole = whole.map(
      (item) => (item?.id === id ? { ...item, done: !item.done } : item)
      // 一定要记得箭头函数花括号返回值必须return 若无{}即默认返回的是这一行
    );

    // const newWhole = whole.map((item) => {
    //   if (item && item.id === id) {
    //     return { ...item, done: !item.done };
    //   }
    //   return item;
    // });
    setWhole(newWhole);
    localStorage.setItem("todos", JSON.stringify(newWhole));
  };
  useEffect(() => {
    // 在组件加载时从本地存储中获取待办事项，并设置为组件状态
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setWhole(storedTodos);
    }
  }, []); //只在首次渲染一次
  useEffect(() => {
    console.log("Updated todos:", whole);
    localStorage.setItem("todos", JSON.stringify(whole));
  }, [whole]);
  return (
    <>
      <div className="app">
        <Header />
        <AddTodo addItem={addItem} />
        <TodoList
          todos={whole}
          onDelete={handleDeleteItem}
          onhandleToggle={handleToggle}
          // done={whole.done}
        />
      </div>
    </>
  );
}

export default App;
