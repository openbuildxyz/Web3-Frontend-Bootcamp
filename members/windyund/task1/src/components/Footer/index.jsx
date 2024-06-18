import React from "react";
import "./index.css"

export default function Footer(props) {

    const {todos,checkAllDone,clearTodoDone } = props
    const doneCount = todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0)
    return (
        <>
            <div className="todo-footer">
                <label>
                    <input type="checkbox" checked= {doneCount ==todos.length? true:false} onChange={(e)=>checkAllDone(e.target.checked)}/>
                </label>
                <span>
                    <span>已完成{doneCount}</span> / 全部{todos.length}
                </span>
                <button className="btn btn-danger" onClick={clearTodoDone}>清除已完成任务</button>
            </div>
        </>
    );
}