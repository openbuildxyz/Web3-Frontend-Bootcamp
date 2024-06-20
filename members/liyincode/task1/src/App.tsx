import './App.css'
import { AddToDo } from './components/AddToDo.tsx'
import { Header } from './components/Header.tsx'
import { ToDoList } from './components/ToDoList.tsx'
import { TodosProvider } from './todosContext.tsx'

function App() {
  return (
    <TodosProvider>
      <div className="container mx-auto">
        <Header />
        <AddToDo />
        <ToDoList className="mt-4" />
      </div>
    </TodosProvider>
  )
}

export default App
