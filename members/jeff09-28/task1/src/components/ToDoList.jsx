import {ToDoItem} from "./ToDoItem.jsx";

export const ToDoList = ({todos, deleteTodo}) => {
    return (
        <ul>
            {todos.map((todo, index) => (
                <div key={todo.id}>
                    <span>
                        {index + 1}、<ToDoItem todo={todo}/>
                    </span>
                    <button onClick={() => deleteTodo(todo.id)}>删除</button>
                </div>
            ))}
        </ul>
    )
}