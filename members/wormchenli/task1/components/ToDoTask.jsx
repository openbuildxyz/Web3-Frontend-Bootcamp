export const ToDoTask = ({taskData, clickHandler, selectedID}) => {
    /* 
        taskData = {id:, title:, content:, completed:}
     */
    if (!taskData) return null
    return (
        <div className="todo-task-wrapper">
            <div className={`todo-task-title ${selectedID===taskData.id?"selected":""}`}
                onClick={()=>clickHandler(taskData.id)}
                >{taskData.title}</div>
        </div>
    );
}