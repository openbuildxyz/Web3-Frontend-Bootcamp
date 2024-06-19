import ToDoItem from "./ToDoItem";
// 定义接口
interface DeleteToDoProps {
    list: Array<{ index: number, msg: string }>,
    deleteToDo: (index: number) => void;
}

function ToDoList({ list, deleteToDo }: DeleteToDoProps) {
    const handleDelete = function (index: number) {
        console.log("list父组件", index);

        deleteToDo(index)
    }

    return (
        <ul className="to-do-list">
            {list.map((element, index) => (
                <ToDoItem index={element.index} msg={element.msg} key={index} deleteToDo={handleDelete}></ToDoItem>
            ))}
        </ul>
    );
}

export default ToDoList;
