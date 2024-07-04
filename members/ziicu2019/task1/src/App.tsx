import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import AddToDo from "./components/AddToDo";
import ToDoList, { ToDoItemProps } from "./components/ToDoList";

function App() {
  const [todoItems, setTodoItems] = useState<ToDoItemProps[]>(() => {
    const savedTodos = localStorage.getItem("todoItems");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
    return () => {
      console.log("AddToDo component unmounted");
    };
  }, [todoItems]);

  const handleAddTodo = (inputValue: string) => {
    const newTodoItem: ToDoItemProps = {
      text: inputValue,
      completed: false,
    };
    setTodoItems([newTodoItem, ...todoItems]);
  };

  const handleRemoveTodo = (todoIndex: number) => {
    const updatedTodoItems = todoItems.filter((_, index) => index !== todoIndex);
    setTodoItems(updatedTodoItems);
    localStorage.setItem("todoItems", JSON.stringify(updatedTodoItems));
  };

  const handleToggleTodo = (todoIndex: number) => {
    const updatedTodoItems = todoItems.map((item, index) => {
      if (index === todoIndex) {
        return {
          ...item,
          completed: !item.completed,
        };
      }
      return item;
    });
    setTodoItems(updatedTodoItems);
    localStorage.setItem("todoItems", JSON.stringify(updatedTodoItems));
  };

  const handleClearAll = () => {
    setTodoItems([]);
    localStorage.setItem("todoItems", JSON.stringify([]));
  };

  return (
    <>
      <Header title="React TODO List Demo" />
      <AddToDo onAddTodo={handleAddTodo} />
      <ToDoList
        todoItems={todoItems}
        onDeleteTodo={handleRemoveTodo}
        onToggleTodo={handleToggleTodo}
        onClearAll={handleClearAll}
      />

      {/* Rest of the code */}
      <p className="mt-40 text-md text-gray-500">&copy; ziicu2019. All rights reserved.</p>
    </>
  );
}

export default App;
