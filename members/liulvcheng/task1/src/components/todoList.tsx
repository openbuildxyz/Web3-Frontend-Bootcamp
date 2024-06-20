import TodoItem from './todoItem'
import '../styles/todo.css'

interface TodoListProps {
  todoList: Array<{ value: string; status: number }>
  checkTodo: (index: number) => void
  removeTodo: (index: number) => void
}

function todoListTwo({ todoList, checkTodo, removeTodo }: TodoListProps) {
  return (
    <div>
      {todoList?.length ? (
        <ul>
          {todoList.map((todo, index) => (
            <TodoItem
              key={index}
              index={index}
              item={todo}
              checkTodo={checkTodo}
              removeTodo={removeTodo}
            ></TodoItem>
          ))}
        </ul>
      ) : (
        ''
      )}
    </div>
  )
}

export default todoListTwo
