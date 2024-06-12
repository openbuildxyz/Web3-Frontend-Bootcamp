
import AddTask from "./components/AddTask";
import ToDoList from "./components/ToDoList";
import Header from "./components/Header"
function App() {
  return (
      <div className="w-[90vw]  h-[90vh] ml-[5vw]">
  
          <main className="max-w-4xl mx-auto mt-4 ">
              <div className="text-center my-5 flex flex-col gap-4">
                  <Header></Header>
                  <AddTask />
              </div>
              <ToDoList  />
          </main>
      </div>

  )
}

export default App
