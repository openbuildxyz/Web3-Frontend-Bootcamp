import Header from "./Header";
import ToDoList from "./ToDoList";

function Todo() {
  return (
    <div className="flex flex-col items-center justify-center w-4/5 mx-auto">
      <Header />
      <ToDoList />
    </div>
  )
}

export default Todo
