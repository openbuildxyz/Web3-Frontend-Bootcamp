import React, { useState } from "react";
import "./index.css";


export default function ToDoItem({item,deleteTodo,updateTodo}) {

    const [mouse,setMouse] = useState(false)


    function handleChange(id) {
        return (event) =>{
            updateTodo(id, event.target.checked)
        }
    }
   

    return (
        <>
            <li  style={{background: mouse? "#ddd":"white"}} onMouseLeave={()=>setMouse(false)} onMouseEnter={()=>setMouse(true)}>
                <label>
                    <input type="checkbox" checked={item.done} onChange={handleChange(item.id)}/>
                    <span>{item.name}</span>
                </label>
                <button className="btn btn-danger" onClick={deleteTodo}>删除</button>
            </li>
        </>
    );
}

