import './App.css'
import ToDoList from './ToDoList'
import AddToDo from './AddToDo'
import useLocalItems from './hooks'

function App() {
  const [items, setItems] = useLocalItems()
  const onDelete = (itemId:number)=> {
    const currentItems = items.filter((item)=>item.id!=itemId)
    setItems(currentItems)
  }

  const onToggle = (itemId:number)=> {
    const currentItems = items.map((item)=>{
      if(item.id===itemId){
        return {
          ...item,
          done: !item.done
        }
      }
      return item
    })
    setItems(currentItems)
  }

  return (
    <>
      <header>
        <h1>To-Do List</h1>
      </header>
      <AddToDo onAddItem={(text:string)=>{
        const currentItems = [
          ...items,
          {
            id: +Date.now(),
            text,
            done: false
          }
        ]
        setItems(currentItems)
      }}/>
      <ToDoList items={items} onDelete={onDelete} onToggle={onToggle}/>
    </>
  )
}

export default App
