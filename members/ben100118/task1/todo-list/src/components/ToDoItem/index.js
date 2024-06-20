import React from "react"
import './index.css'
const ToDoItem = ({todo, changeDone, deleteTodo}) => {
    const handleChange = (id) => {
        changeDone(id)
    }
    const handleDelete = (id) => {
        var ans = window.confirm("确认删除");
        if(ans){
            try{
                deleteTodo(id)
            } catch(error){
                console.error("删除操作失败:", error);
            }
        } 
    }
    return (
        <div>
            <li>
                <label>
                    <input type="checkbox" checked={todo.isDone} onClick={() => handleChange(todo.id)}/>
                    <span className={todo.isDone ? 'strikethrough' : ''}>{todo.text}</span>
                </label>
                <button class="btn btn-danger" onClick={() => handleDelete(todo.id)}>删除</button>
            </li>
        </div>
    )
}

export default ToDoItem