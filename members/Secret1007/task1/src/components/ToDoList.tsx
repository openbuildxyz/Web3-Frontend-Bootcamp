import ToDoItem, { ToDoItemProp } from "./ToDoItem";

interface ToDoListProps {
    todos: ToDoItemProp[];
    onComplete: (id: number) => void; // 从父组件传递的完成任务的方法
    onDelete: (id: number) => void; // 从父组件传递的删除任务的方法
}

const ToDoList: React.FC<ToDoListProps> = ({ todos, onComplete,onDelete }) => {
    return (
        <ul>
            {todos.map((todo, index) => (
                <ToDoItem item={todo} index={index} onComplete={onComplete} onDelete={onDelete} key={todo.id}></ToDoItem>
            ))}
        </ul>
    );
};

export default ToDoList;
