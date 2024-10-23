// import { useEffect, useState } from "react";
import { useState } from "react";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";

function App() {
  const [refresh, setRefresh] = useState(0);

  const handleClearStorage = () => {
    localStorage.clear();
    setRefresh((refresh) => refresh + 1);
  };

  return (
    <div className="h-screen flex flex-col w-screen bg-pink-200 items-center justify-center py-32 gap-4">
      <button
        onClick={handleClearStorage}
        className="w-2/3 h-10 bg-pink-600 text-3xl text-white font-mono rounded-lg hover:bg-pink-500 duration-150"
      >
        点我清除localStorage缓存喵~
      </button>
      <div className="h-full m-auto flex flex-col w-2/3 bg-blue-300 items-center gap-4 rounded-lg py-4 overflow-y-scroll">
        <Header></Header>
        <ToDoList key={refresh}></ToDoList>
      </div>
    </div>
  );
}

export default App;
