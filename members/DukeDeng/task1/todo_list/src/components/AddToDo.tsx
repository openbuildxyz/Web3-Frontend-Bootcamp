import { useCallback, useState } from "react";

interface IProps {
    onAdd: (text: string) => void;
}
const AddToDo: React.FC<IProps> = (props) => {
    const { onAdd } = props;
    const [text, setText] = useState<string>('');

    const handleAdd = useCallback(() => {
        const nText: string = text.trim();
        if (!nText) return;
        onAdd(nText);
        setText('');
    }, [text]);

    const handleChange = useCallback((e: KeyboardEvent) => {
        const nText: string = (e.target as HTMLInputElement).value;
        // 回车
        if (e.key === 'Enter') {
            handleAdd();
        } else {
            setText(nText);
        }
    }, [text, handleAdd]);

    return (
        <div>
            <input type="text" required value={text} onChange={handleChange} placeholder="Add a b new task..."/>
            <button onClick={handleAdd}>+</button>
        </div>
    )
}

export default AddToDo;