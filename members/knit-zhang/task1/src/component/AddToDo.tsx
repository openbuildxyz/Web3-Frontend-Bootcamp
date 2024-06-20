import { useState } from 'react';

interface AddnewToDo {
    onAdd: (text: string) => void
}

const AddToDo: React.FC<AddnewToDo> = ({ onAdd }) => {
    // 存储用户输入以及原值
    const [newToDo, setNewToDo] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewToDo(event.target.value);
    };

    // 添加新ToDo
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (newToDo.trim() != '') {
            onAdd(newToDo);
            setNewToDo('');
        } else {
            alert('Please add a new ToDo');
        }
    };

    return (
        <form>
            <input 
                    type="text" 
                    onChange={handleInputChange}
                    value={newToDo}
                    placeholder="Add new ToDo"
            />
            <button 
                type='submit'
                onClick={handleSubmit}
            >
                Add
            </button>
        </form>
    )
}

export default AddToDo;