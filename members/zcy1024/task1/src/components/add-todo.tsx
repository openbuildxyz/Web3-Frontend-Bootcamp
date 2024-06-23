import { useCallback, useState } from "react";

export default function AddToDo(props: any) {
    const { addToDo } = props;
    const [todoContent, setTodoContent] = useState('');

    const clickAdd = useCallback(() => {
        const content = todoContent.trim();
        if (content)
            addToDo(content);
        setTodoContent('');
    }, [todoContent]);

    const changeContent = useCallback((event: any) => {
        const content = event.target.value;
        setTodoContent(content);
    }, [todoContent, clickAdd]);

    return (
        <div>
            <input type="text" required value={todoContent} onChange={changeContent} placeholder="Write Your TODO Task..." size={33}></input>
            <button onClick={clickAdd}>add</button>
        </div>
    )
}