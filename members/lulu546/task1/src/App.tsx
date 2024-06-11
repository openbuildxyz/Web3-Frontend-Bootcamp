
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
function App() {
  return (
      <div className="w-[90vw]  h-[90vh] ml-[5vw]">
    
          <main className="max-w-4xl mx-auto mt-4 ">
              <div className="text-center my-5 flex flex-col gap-4">
                  <h1 className="text-2xl font-bold ">及时去做</h1>
                  <AddTask />
              </div>
              <TodoList  />
          </main>
      </div>

  )
}

export default App
