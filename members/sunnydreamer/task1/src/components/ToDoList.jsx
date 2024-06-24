import ToDoItem from "./ToDoItem";

const ToDoList = ({ tasks, deleteTask, setTasks }) => {
    return (
        <div className="toDoListContainer">
            {tasks.map((task) => (
                <ToDoItem key={task.id} tasks={tasks} task={task} setTasks={setTasks} deleteTask={deleteTask} />
            ))}
        </div>
    );
};

export default ToDoList;
