function ToDoItem({ event, delItem, setDone }) {
  function handleDelItem() {
    delItem(event)
  }
  return (
    <>
      <div className="todo-item">
        <div onClick={() => setDone(event.uuid)} className="item-content">
          {event.content}
          {event.isDone && ' ✔'}
        </div>
        <div className="item-del" onClick={handleDelItem}>
          Del
        </div>
      </div>
    </>
  )
}

export default ToDoItem
