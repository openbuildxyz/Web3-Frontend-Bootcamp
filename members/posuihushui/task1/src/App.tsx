import "./app.css";
import { Header } from "@/components/Header";
import { ITodoItem } from "@/components/ToDoItem";
import { AddToDo } from "@/components/AddToDo";
import { ToDoList } from "@/components/ToDoList";
import { useLocalStorage } from "usehooks-ts";

function App() {
  const [list, setList] = useLocalStorage<ITodoItem[]>("todolistlocalkey", []);
  const addList = (newItem: string) => {
    setList((oldList) => {
      const newId =
        list.length === 0 ? 0 : Math.max(...oldList.map((v) => v.id), 0) + 1;
      return [
        {
          id: newId,
          completed: false,
          text: newItem,
        },
        ...oldList,
      ];
    });
  };
  const markTaskStatus = (item: Omit<ITodoItem, "text">) => {
    setList((l) => {
      return l.map((e) => (e.id === item.id ? { ...e, ...item } : e));
    });
  };
  const deleteTask = (id: number) => {
    setList((l) => {
      return l.filter((e) => e.id !== id);
    });
  };
  return (
    <section className="container space-y-3">
      <Header />
      <AddToDo addList={addList} />
      <ToDoList
        list={list}
        markTaskStatus={markTaskStatus}
        deleteTask={deleteTask}
      />
    </section>
  );
}

export default App;
