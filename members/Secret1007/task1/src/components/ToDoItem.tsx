import { Button } from "antd";
import "./ToDoItem.css";

interface ToDoItemProps {
    item: {
        text: string;
        completed: boolean;
        id: number;
    };
    index: number;
    onComplete: (id: number) => void;

    onDelete: (id: number) => void;
}
export type ToDoItemProp = ToDoItemProps["item"];
const ToDoItem: React.FC<ToDoItemProps> = ({ item, index, onComplete, onDelete }) => {
    const handleComplete = () => {
        onComplete(item.id);
    };

    const handleDelete = () => {
        onDelete(item.id);
    };
    return (
        <li key={item.id} className="flex justify-between items-center mb-2">
            <div className={`mr-4 ${item.completed ? "completed" : "blinking-text"}`}>
                <span onClick={handleComplete} className="cursor-pointer">
                    {index + 1}.{item.text}
                </span>
            </div>
            <Button className="bg-red text-white" onClick={handleDelete}>
                Delete
            </Button>
            {/* {item.completed ? (
                <Button className="bg-red text-white" onClick={handleDelete}>
                    Delete
                </Button>
            ) : (
                <Button className="bg-#74b9ff text-white" onClick={handleComplete}>
                    Completed
                </Button>
            )} */}
        </li>
    );
};

export default ToDoItem;
