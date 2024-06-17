import { useState } from "react"

export const InPutArea = ({taskUpdateHook}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleTitleValueChange = (e)=>{
        setTitle(e.target.value);
    }
    const handleContentValueChange = (e)=>{
        setContent(e.target.value);
    }
    return (
        <div className="input-area-wrapper">
            <div className="input-area-boxes">
                <input 
                    type="text" 
                    className="input-area-title" 
                    value={title}
                    placeholder="Title" 
                    onChange={handleTitleValueChange}
                />
                <textarea 
                    className="input-area-content" 
                    placeholder="Task Detail"
                    value={content}
                    onChange={handleContentValueChange}
                />
            </div>
            <button 
                className="btn btn-add-task" 
                onClick={()=>taskUpdateHook({title:title, content:content, completed: false, id:Date.now()})}>
                Add Task
            </button>
        </div>
    )
}