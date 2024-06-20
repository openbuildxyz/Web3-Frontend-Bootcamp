import { ToDoTask } from "./ToDoTask"

export const ToDoList = ({listData, selectedTaskHook, selectedID}) => {
    /*
    listData = [{id, title, content, completed}] 
     */
    const handleTaskClick = (id) => {
        console.log(id)
        selectedTaskHook(id)
    }

    return (
        <div className="todo-list-body-wrapper">
            <div className="todo-list-header">Lists of Todos</div>
            {
                listData.length === 0 
                    ? <div>No Todos</div>
                    : <div className="todo-list-task-container">
                        {
                            listData.map((item, index) => 
                                <ToDoTask 
                                    key={index} 
                                    taskData={item} 
                                    clickHandler = {handleTaskClick}
                                    selectedID={selectedID}
                                />)
                        }</div>
            }
        </div>
    )
}
