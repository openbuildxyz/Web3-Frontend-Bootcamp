import ToDoItem from './ToDoItem'

export default function TodoList({ todos, onDelete, onCompleted }) {
  return (
    <ul className='w-90 py-4'>
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          onCompleted={onCompleted}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
