import React from "react";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";

const App: React.FC = () => {
  return (
    <div className="p-4">
      <Header title="Todo List" />
      <ToDoList />
    </div>
  );
};

export default App;
