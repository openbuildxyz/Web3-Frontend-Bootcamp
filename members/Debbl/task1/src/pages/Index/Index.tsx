import Header from "./components/Header";
import ToDoList from "./components/ToDoList";
import AddToDo from "./components/AddToDo";
import { useToDo } from "~/hooks/useToDo";

function Index() {
  const { list, inputText, onChange, handleAdd, handleDel, handleDone } =
    useToDo();

  return (
    <>
      <Header title="ToDo" />
      <main className="flex flex-col items-center gap-y-6">
        <AddToDo
          inputText={inputText}
          onChange={onChange}
          handleAdd={handleAdd}
        />

        <ToDoList list={list} handleDone={handleDone} handleDel={handleDel} />
      </main>
    </>
  );
}

export default Index;
