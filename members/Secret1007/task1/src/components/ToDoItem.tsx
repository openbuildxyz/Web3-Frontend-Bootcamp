import { Button } from "antd";
import { useState } from "react";
import "./ToDoItem.css";

interface ToDoItemProps {
    item: {
        text: string;
        completed: boolean;
        id: number;
    };
    index: number;
    onComplete: (id: number) => void;
}
export type ToDoItemProp = ToDoItemProps["item"];
const ToDoItem: React.FC<ToDoItemProps> = ({ item, index, onComplete }) => {
    const [isCompleted, setIsCompleted] = useState(item.completed);
    const handleComplete = () => {
        setIsCompleted(true);
        onComplete(item.id);
    };

    const handleDelete = () => {};
    return (
        <li key={item.id} className="flex justify-between items-center mb-2">
            <div className={`mr-4 ${item.completed ? "completed" : ""}`}>
                {index + 1}.{item.text}
            </div>
            {isCompleted ? (
                <Button className="bg-red text-white" onClick={handleDelete}>
                    Delete
                </Button>
            ) : (
                <Button className="bg-#74b9ff text-white" onClick={handleComplete}>
                    Completed
                </Button>
            )}
        </li>
    );
};

export default ToDoItem;
