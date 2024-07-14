
import ToDoItem from './ToDoItem';
import { ListProps } from "../typings";



const ToDoList: React.FC<ListProps> = ({ list, toggleItem, deleteItem }) => <>
    {
        list.map((item, idx) => (
            <ToDoItem item={item} key={idx} deleteItem={deleteItem} toggleItem={toggleItem} />
        ))
    }
</>


export default ToDoList;