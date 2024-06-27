import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./App.scss";
import AddToDo from "./components/AddToDo";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";

// 假设每个待办事项都有一个唯一的 id 属性  
type TodoItem = { id: string, todo: string, completed: boolean };  

// App 组件：作为应用的根组件。
const App = () => {
  const headerTitle = "My To-Do List";

  // 初始待办事项列表（现在是一个 TodoItem 类型的数组）  
  const [toDoList, setToDoList] = useState<TodoItem[]>([]);

  // 从本地存储中恢复待办事项。  
  useEffect(() => {  
    try {  
      const savedToDoList = localStorage.getItem("toDoList");  
      if (savedToDoList) {  
        const parsedList = JSON.parse(savedToDoList) as TodoItem[];  
        if (Array.isArray(parsedList)) {  
          setToDoList(parsedList);  
        }  
      }  
    } catch (error) {  
      console.error("Error parsing saved to-do list:", error);  
    }  
  }, []);  

  // 保存到本地存储：在待办事项列表改变时执行。  
  useEffect(() => {  
    localStorage.setItem("toDoList", JSON.stringify(toDoList));  
  }, [toDoList]);  

  // 添加一个新的 todo 项到列表。
  const addToDo = useCallback((todo: string) => {  
    const newId = uuidv4(); // 使用 uuid 生成一个唯一的 id  
    const newItem: TodoItem = { id: newId, todo, completed: false };  
    setToDoList(prevList => [...prevList, newItem]);  
  }, []);  

  // 删除一个 todo 项。
  const deleteToDo = useCallback((id: string) => {  
    setToDoList(prevList => prevList.filter(item => item.id !== id));  
  }, []);  

  // 标记完成：用户可以通过点击待办事项，标记其为已完成或未完成。
  const toggleToDo = useCallback((id: string) => {  
    setToDoList(prevList => 
      prevList.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );  
  }, []);  

  // 返回一个 JSX 元素。
  return (
    <div className="App">
      <Header title={headerTitle} />
      <AddToDo addToDo={addToDo} />
      <ToDoList toDoList={toDoList} handleDelete={deleteToDo} toggleToDo={toggleToDo} /> 
    </div>
  );
};

export default App;
