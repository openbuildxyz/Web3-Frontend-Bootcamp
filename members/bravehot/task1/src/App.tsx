import Header from "@/components/Header";
import ToDoList from "@/components/ToDoList";

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center">
      <div className="w-[980px]	h-4/5 flex flex-col gap-4 overflow-hidden">
        <Header />
        <ToDoList />
      </div>
    </div>
  );
}

export default App;
