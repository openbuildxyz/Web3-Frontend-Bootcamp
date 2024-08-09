import Header from "./components/Header"
import ToDoList from "./components/ToDoList"



function App() {

  return (
    <div className="bg-gray-100 w-[40%]  mx-auto  my-10 border p-2 rounded flex flex-col items-center gap-y-3">
      <Header />
      <ToDoList />
    </div>
  )
}

export default App
