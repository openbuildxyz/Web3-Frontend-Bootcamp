export default function ToDoItem({ todo, onDelete, onCompleted }) {
  return (
    <li key={todo.id} className='flex text-lg items-center'>
      <div
        className='flex-1 p-2 pl-0 cursor-pointer flex items-center'
        onClick={() => onCompleted(todo.id)}
      >
        <CheckedIcon completed={todo.completed}></CheckedIcon>
        <span className={`flex-1 ${todo.completed ? 'line-through' : ''}`}>
          {todo.text}
        </span>
      </div>
      <button className='p-2' onClick={() => onDelete(todo.id)}>
        X
      </button>
    </li>
  )
}

function CheckedIcon({ completed }) {
  return completed ? (
    <span className='text-green-500 inline-block w-5 mr-2'>✓</span>
  ) : (
    <span className='w-5 h-5 rounded-full border-2 inline-block mr-2'> </span>
  )
}
