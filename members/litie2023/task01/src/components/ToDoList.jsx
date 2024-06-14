import { useState, useEffect } from 'react'
import ToDoItem from './ToDoItem'
import AddToDo from './AddToDo'
function getUuid() {
  return new Date().getTime()
}
function getLocalData() {
  return (
    localStorage.getItem('events') && JSON.parse(localStorage.getItem('events'))
  )
}
function ToDoList() {
  const [content, setContent] = useState('')
  const [events, setEvents] = useState(getLocalData() ? getLocalData() : [])
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events))
  }, [events])
  function setDone(uuid) {
    const newList = events.map((item) => {
      if (item.uuid === uuid) {
        return { ...item, isDone: !item.isDone }
      }
      return item
    })
    setEvents(newList)
  }
  function delItem({ uuid }) {
    setEvents(events.filter((item) => item.uuid !== uuid))
  }
  function addEvent() {
    if (!content) return
    setEvents([...events, { uuid: getUuid(), isDone: false, content: content }])
    setContent('')
  }
  return (
    <>
      <div className="add-event">
        <input value={content} onChange={(e) => setContent(e.target.value)} />
        <AddToDo onClick={addEvent} />
      </div>
      <div className="todo-list">
        {events.map((event) => (
          <ToDoItem
            key={event.uuid}
            event={event}
            delItem={delItem}
            setDone={setDone}
          />
        ))}
      </div>
    </>
  )
}

export default ToDoList
