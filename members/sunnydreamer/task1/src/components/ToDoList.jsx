import ToDoItem from "./ToDoItem";

const ToDoList = ({ tasks, deleteTask }) => {
    return (
        <div className="toDoListContainer">
            {tasks.map((task, index) => (
                <ToDoItem key={index} index={index} tasks={tasks} task={task} deleteTask={deleteTask} />
            ))}
        </div>
    );
};

export default ToDoList;
