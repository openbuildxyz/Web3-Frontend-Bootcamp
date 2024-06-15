import React,{ useState } from "react";

interface AddToProps {
    addTodo: (text:string) => void;
}

const AddToDo: React.FC<AddToProps> = ({ addTodo }) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button type="submit">添加</button>
        </form>
    );
};

export default AddToDo;