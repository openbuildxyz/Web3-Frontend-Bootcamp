import React from 'react';
import Header from './components/Header';
import List from './components/List';
import AddItem from './components/AddItem';
import { useTodo } from "./hooks/useTodo";

const App = () => {
  const {todoItems,addTodo, deleteTodo, toggleCompletion} =useTodo()
  return (
    <div className="w-[100vw]">
      <div className="max-w-lg mx-auto p-4 my-[auto]">
        <Header />
        <AddItem addTodo={addTodo} />
        {todoItems.length === 0 ? (
          <div className="w-full bg-[#efefef] h-52  flex items-center justify-center text-gray-500">
            请先添加待办项
          </div>
        ) : (
          <List
            todoItems={todoItems}
            deleteTodo={deleteTodo}
            toggleCompletion={toggleCompletion}
          />
        )}
      </div>
    </div>
  );
};

export default App;
