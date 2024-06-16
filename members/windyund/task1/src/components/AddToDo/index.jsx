import React, { Component } from "react";
import { nanoid } from "nanoid";
import { useEffect } from "react";

export default function AddToDo(props) {


    function handleKeyUp(event) {
        const { keyCode, target } = event
        //判断回车按键
        if (keyCode !== 13) return
        //判断不能为空
        if (target.value === "") {
            alert("输入不能为空！")
            return
        }
        const todoObj = { id: nanoid(), name: target.value, done: false }
        const {addTodo} = props
        addTodo(todoObj)
        target.value = ""
    }

    return (
        <>
            <div className="todo-header">
                <input type="text" onKeyUp={(e) => { handleKeyUp(e) }} placeholder="请输入你的任务名称，按回车键确认" />
            </div>
        </>
    );
}
