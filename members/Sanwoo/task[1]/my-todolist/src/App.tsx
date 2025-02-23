import { FC, useState } from "react";
import "./App.css";
import ToDoForm from "./components/ToDoForm";
import ToDoList from "./components/ToDoList";
import Todo from "./models/Todo.model";

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const handleAddTodoItem = (inputValue: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: (prevTodos.length + 1).toString(), text: inputValue },
    ]);
  };
  const handleDeleteTodoItem = (todoId: string) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todoItem) => todoItem.id !== todoId)
    );
  };
  return (
    <>
      <header className="w-screen h-24 flex justify-center items-center">
        <div className="text-4xl text-center font-bold">Sanwoo's Todo List</div>
      </header>
      <ToDoForm handleAddTodoItem={handleAddTodoItem}></ToDoForm>
      <ToDoList
        todos={todos}
        handleDeleteTodoItem={handleDeleteTodoItem}
      ></ToDoList>
    </>
  );
};

export default App;
