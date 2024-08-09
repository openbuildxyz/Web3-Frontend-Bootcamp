import ToDoItem from './ToDoItem'

export default function ToDoList({ todos, deleteTodo, toggleTodo }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <ToDoItem
          key={index}
          todo={todo}
          deleteTodo={() => deleteTodo(index)}
          toggleTodo={() => toggleTodo(index)}
        />
      ))}
    </ul>
  )
}