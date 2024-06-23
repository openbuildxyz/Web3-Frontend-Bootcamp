import React, { useState } from 'react';
import { Input, Space, Button } from 'antd';

interface AddToDoProps {
    onAdd: (text: string) => void;
}

const AddToDo: React.FC<AddToDoProps> = ({ onAdd }) => {
    const [input, setInput] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleAdd = () => {
        console.log("Adding:", input); 
        if (input.trim().length > 0) {
          addToDoAndClearInput();
        }
      };

    const addToDoAndClearInput = () => {
        console.log("ToDo to Add:", input);
        onAdd(input);
        setInput('');
    };

    return (
        <div>
            <Space.Compact style={{ width: '100%' }}>
                <Input value={input} onChange={handleInputChange} placeholder='Please Input Your Todo Item'/>
                <Button type="primary" onClick={handleAdd}>Add</Button>
            </Space.Compact>
        </div>
    );
}

export default AddToDo;