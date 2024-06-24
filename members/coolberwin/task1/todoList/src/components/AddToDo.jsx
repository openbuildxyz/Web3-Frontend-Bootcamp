import React,{useState} from 'react';

// AddToDo组件：包含一个输入框和添加按钮，用于添加新的待办事项

function AddToDo({addTodo}){


    // useState钩子：声明一个状态变量text和更新它的函数setText
    const [text, setText] = useState("");

    // 表单提交事件处理函数
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(text.trim()){
            addTodo(text);
            setText(""); 
            }
    };

    return (
        <form onSubmit = {handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e)=>setText(e.target.value)}
                placeholder="请输入待办事项"
                />
            <button type="submit">添加</button>
        </form>
    );


}

export default AddToDo;