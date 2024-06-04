import { useEffect, useState } from "react";
import AddToDo from "./components/AddToDo";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";

const App = () => {
  const [items, setItems] = useState(
    () => JSON.parse(localStorage.getItem("items")) || [],
  );

  const addItem = (item) => {
    const newItems = { id: new Date().getTime(), label: item, isDone: false };
    setItems([...items, newItems]);
  };

  const toggleItem = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, isDone: !item.isDone };
      }

      return item;
    });
    setItems(newItems);
  };

  const deleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <main className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white px-8 py-6 shadow-md">
      <Header />
      <AddToDo addItem={addItem} />
      <ToDoList items={items} toggleItem={toggleItem} deleteItem={deleteItem} />
    </main>
  );
};

export default App;
