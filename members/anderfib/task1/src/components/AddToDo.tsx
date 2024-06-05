import { FormEvent, useState } from "react";

interface IPorps {
    submit: (value: string) => void;
}


const AddToDo: React.FC<IPorps> = (props) => {

    const [value, setValue] = useState('');

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (value.trim() != '') {
            props?.submit(value);
            setValue('');
        }
    }

    return (
        <form onSubmit={onSubmit} className="add-form">
            <input className="input" type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Add a new todo" />
            <button type="submit" className="btn-add">Add</button>
        </form>
    );
}
export default AddToDo;