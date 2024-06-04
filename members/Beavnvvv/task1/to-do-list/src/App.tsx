import "./App.css";
import AddComponent from "./views/add";
import ListComponent from "./views/list";
import TotalComponent from "./views/total";
import { useState, useEffect } from "react";

function App() {
  const [toDoList, settoDoList] = useState([]);
  const [total, setTotal] = useState(0);
  const [isDoneTotal, setIsDoneTotal] = useState(0);

  const gettoDoList = (value) => {
    const newItem = { id: toDoList.length + 1, value: value, isDone: false };
    settoDoList((value) => [...value, newItem]);
  };

  const handleValue = (id, type) => {
    let newItem = toDoList;
    if (type == "delete") {
      newItem = newItem.filter((item) => item.id !== id);
    } else {
      newItem.forEach((item) => {
        if (item.id === id) item.isDone = true;
      });
    }
    settoDoList((value) => [...newItem]);
  };
  const getTotal = () => {
    let newTotal = 0;
    let newIsDoneTotal = 0;
    toDoList.forEach((item) => {
      if (!item.isDone) newTotal += 1;
      if (item.isDone) newIsDoneTotal += 1;
    });
    setTotal(newTotal);
    setIsDoneTotal(newIsDoneTotal);
  };

  useEffect(() => {
    getTotal();
  }, [toDoList]);

  return (
    <>
      <h1>To Do List</h1>
      <div className="content">
        <AddComponent gettoDoList={gettoDoList} />
        <ListComponent toDoList={toDoList} handleValue={handleValue} />
        {toDoList.length > 0 && (
          <TotalComponent total={total} isDoneTotal={isDoneTotal} />
        )}
      </div>
    </>
  );
}

export default App;
