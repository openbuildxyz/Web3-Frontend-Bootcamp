import { FormEvent, useState } from "react";
import { AddBtnPorps } from "../typings";



const AddToDo: React.FC<AddBtnPorps> = (props) => {

    const [value, setValue] = useState('')

        , onSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (value.trim() != '') {
                props?.submit(value);
                setValue('');
            }
        }

    return (
        <form onSubmit={onSubmit} className=" add-form flex items-center justify-center p-4">
            <input className=" p-4 flex flex-1 mr-3" type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="请输入" />
            <button type="submit" className="btn-add p-2 text-white text-lg w-16 bg-black	">添加</button>
        </form>
    );
}
export default AddToDo;