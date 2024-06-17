import ToDoItem, { ToDoItemProp } from "./ToDoItem";

interface ToDoListProps {
    todos: ToDoItemProp[];
    onComplete: (id: number) => void; // 从父组件传递的完成任务的方法
}

const ToDoList: React.FC<ToDoListProps> = ({ todos, onComplete }) => {
    return (
        <ul>
            {todos.map((todo, index) => (
                <ToDoItem item={todo} index={index} onComplete={onComplete} key={todo.id}></ToDoItem>
            ))}
        </ul>
    );
};

export default ToDoList;
