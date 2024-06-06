import './App.css'
import ToDoList from './ToDoList'
import Header from './Header'


function App() {


  return (
    <div className='bg-slate-100 border-x-2 border-y-2 max-w-2xl flex mx-auto my-10 flex-col'>
      <Header></Header>
      <ToDoList></ToDoList>
    </div>
  )
}

export default App
