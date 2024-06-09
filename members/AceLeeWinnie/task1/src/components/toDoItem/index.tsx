import { useCallback } from "react";

import './index.css';

export interface IToDoItem {
    id: string;
    text: string;
    done: boolean;
}

type IProps = IToDoItem & {
    onRemove: () => void;
    onDone: (flag: boolean) => void;
};

const ToDoItem: React.FC<IProps> = (props) => {
    const { done, text, onRemove, onDone } = props;
    const handleDone = useCallback(() => {
        onDone(!done);
    }, [done, onDone]);
    return (
        <li>
            <span className={"todoitem__text "+(done ? "--finished" : "")} onClick={handleDone}>{text}</span>
            <button onClick={onRemove}>X</button>
        </li>
    )
}

export default ToDoItem;