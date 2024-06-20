import { useCallback, useEffect, useState } from "react";
import "./App.css";
import ToDoList from "./ToDoList";
import Header from "./Header";
import AddToDo from "./AddToDo";

const KEY = "TO_DO_LIST";

const initCache = (key: string) => {
  const cache = sessionStorage.getItem(key);
  return cache ? JSON.parse(cache) : undefined;
};

const saveCache = (key: string, value: string) =>
  sessionStorage.setItem(key, value);

function App() {
  const [toDoList, setToDoList] = useState<ToDoListDTO[]>(initCache(KEY) || []);
  const handleAddTODo = useCallback(
    (value: string) =>
      setToDoList([
        ...toDoList,
        { key: new Date().getTime(), value, complete: false }
      ]),
    [toDoList]
  );

  const handleDeleteItem = useCallback(
    (key: number) => setToDoList(toDoList.filter((i) => i.key !== key)),
    [toDoList]
  );

  const handleSwitchCompleteItem = useCallback(
    (key: number, complete: boolean) => {
      const item = toDoList.find((i) => i.key === key);
      item!.complete = complete;
      setToDoList([...toDoList]);
    },
    [toDoList]
  );

  useEffect(() => saveCache(KEY, JSON.stringify(toDoList)), [toDoList]);
  return (
    <>
      <Header />
      <div>
        <AddToDo onAddTODO={handleAddTODo} />
        <ToDoList
          list={toDoList}
          onDeleteItem={handleDeleteItem}
          onSwitchCompleteItem={handleSwitchCompleteItem}
        />
      </div>
    </>
  );
}

export default App;
