import Header from './components/Header'
import AddToDo from './components/AddToDo'
import ToDoList from './components/ToDoList'

function App() {

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <Header />
        <AddToDo />
        <ToDoList />
      </div>
    </div>
  )
}

export default App
