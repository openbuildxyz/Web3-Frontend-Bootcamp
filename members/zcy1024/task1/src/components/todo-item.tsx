import { useCallback } from "react";
import "./todo-item.css";

export default function ToDoItem(props: any) {
    const { completed, content, clickCheck, clickRemove } = props;

    const check = useCallback(() => {
        clickCheck(!completed);
    }, [completed, clickCheck]);

    return (
        <li>
            <span className={"item" + (completed ? "--completed" : "")} onClick={check}>{content}</span>
            <button className="button" onClick={clickRemove}>X</button>
        </li>
    )
}