import ToDoItem from "./ToDoItem";
// 定义接口
interface DeleteToDoProps {
    list: Array<{ index: number, msg: string, status: boolean }>,
    deleteToDo: (index: number) => void;
}

function ToDoList({ list, deleteToDo }: DeleteToDoProps) {
    const handleDelete = function (index: number) {
        deleteToDo(index)
    }

    return (
        <ul className="to-do-list">
            {list.map((element, index) => (
                <ToDoItem index={element.index} msg={element.msg} status={element.status} key={index} deleteToDo={handleDelete}></ToDoItem>
            ))}
        </ul>
    );
}

export default ToDoList;
