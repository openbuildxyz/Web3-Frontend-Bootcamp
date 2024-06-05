import ToDoItem from './ToDoItem.jsx'

function ToDoList({ list, removeItem, toggleStatus }) {
  return (
    <div className="flex-1 overflow-y-auto">
      {
        list.map(v => {
          return (
            <ToDoItem value={v.value} status={v.status} id={v.id} removeItem={removeItem} toggleStatus={toggleStatus} key={v.id}></ToDoItem>
          )
        })
      }
    </div>
  )
}

export default ToDoList