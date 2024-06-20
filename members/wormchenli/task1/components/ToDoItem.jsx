export const ToDoItem = ({taskData, taskUpdateHook, taskDeleteHook}) => {
    
    const toggleComplete = () => {
        const _task = { ...taskData, completed: !taskData.completed }
        taskUpdateHook(_task)
    }
    const handleDelete = ()=> {
        taskDeleteHook(taskData.id)
    }
    if (!taskData) return null
    return (
        <div className="todo-item-wrapper">
            <div className="todo-item-title-wrapper">
                <span className="todo-item-title">{taskData.title}</span>
                <span className= {taskData.completed?"todo-item-icon-completed":"todo-item-icon-pending"}>{taskData.completed?'Done':'Pending'}</span>
            </div>
            <div className="todo-item-content">{taskData.content}</div>
            <div className="todo-item-operation">
                <button className="btn btn-complete-toggle" onClick={toggleComplete}>
                    {taskData.completed?"Reopen":"Done"}
                </button>
                <button className="btn btn-delete" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}