// display all the todo items

import { Todo } from '../App';
import TodoItem from './ToDoItem';

function ToDoList({todos,completedTodo,deleteTodo}: {todos: Todo[], completedTodo: (id: number) => void, deleteTodo: (id: number) => void}){
    return (
        <ul>
            {todos.map((todo)=>(
                <TodoItem key={todo.id} todo={todo} completeTodo={completedTodo} deleteTodo={deleteTodo}/>
            ))}
        </ul>
    );
}



export default ToDoList