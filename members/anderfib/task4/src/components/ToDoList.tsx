
import ToDoItem from './ToDoItem';
import { ToDo } from "../typings";



interface IProps {
    list: ToDo[],
    toggleItem: (id: number) => void,
    deleteItem: (id: number) => void
}


const ToDoList: React.FC<IProps> = ({ list, toggleItem, deleteItem }) => {
    return (
        <>
            {
                list.map((item, idx) => (
                    <ToDoItem item={item} key={idx} deleteItem={deleteItem} toggleItem={toggleItem} />
                ))
            }
        </>
    );
}

export default ToDoList;