// 定义接口
interface DeleteToDoProps {
    index: number;
    msg: string;
    deleteToDo: (index: number) => void;
}

function ToDoItem({ index, msg, deleteToDo }: DeleteToDoProps) {
    const handleDelete = () => {
        deleteToDo(index);
    };
    return (
        <li key={index}>
            {msg}
            <div className="delete bg-blue-500" onClick={handleDelete}>X</div>
        </li>

    );
}

export default ToDoItem;
