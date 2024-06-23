import React, { Todo } from '../App'
import TodoItem from './TodoItem'
interface Props {
    todos: Todo[]
    toggleTodo: (index: number) => void
    deleteTodo: (index: number) => void
}
export default function TodoList({ todos, toggleTodo, deleteTodo }: Props){
    return (
        <ul>
            {todos.map((todo, index) => {
                return (
                    <TodoItem key={index} index={index} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
                )
            })}
        </ul>
    )
}