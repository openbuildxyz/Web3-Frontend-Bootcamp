import { useEffect, useState } from "react";
import "./App.scss";
import AddToDo from "./components/AddToDo";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";

// 假设每个待办事项都有一个唯一的 id 属性  
type TodoItem = { id: string, todo: string, completed: boolean};  

// App 组件：作为应用的根组件。
const App = () => {
  // console.log("App component rendered", import.meta.env);

  // 初始待办事项列表（现在是一个 TodoItem 类型的数组）  
  const [toDoList, setToDoList] = useState<TodoItem[]>([]);

  // 保存到本地存储：在组件首次挂载和待办事项列表改变时执行。  
  useEffect(() => {  
    localStorage.setItem("toDoList", JSON.stringify(toDoList));  
  }, [toDoList]);  

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

  // 添加一个新的 todo 项到列表。这里需要生成一个唯一的 id。  
  const addToDo = (todo: string) => {  
    // 假设我们使用简单的递增 id，但在实际应用中，您可能需要一个更健壮的方法  
    const newId = Math.random().toString(36).substring(7); // 生成一个随机的 id  
    const newItem: TodoItem = { id: newId, todo , completed: false};  
    setToDoList([...toDoList, newItem]);  
  };  

  // 删除一个 todo 项。现在我们需要 id 而不是索引。  
  const deleteToDo = (id: string) => {  
    console.log("Deleting to-do item with id:", id);
    
    // 过滤掉 id 匹配的项
    setToDoList(toDoList.filter(item => item.id !== id));  
  };  

  //  标记完成：用户可以通过点击待办事项，标记其为已完成或未完成。
  const toggleToDo = (id: string) => {
    console.log("Toggling to-do item with id:", id);
    
    // 遍历待办事项列表，找到 id 匹配的项，并更新其 completed 属性。
    const updatedToDoList = toDoList.map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setToDoList(updatedToDoList);
  
  }
  
  // 返回一个 JSX 元素。
  return (
    <div className="App">
      <Header />
      <AddToDo addToDo={addToDo} />
      <ToDoList toDoList={toDoList} handleDelete={deleteToDo} toggleToDo={toggleToDo} /> 
    </div>
  )
}

export default App
