import React, { useRef } from 'react';

import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface AddTodoProps {
  addTodo: (text: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddTodo = () => {
    if (inputRef?.current?.value) {
      addTodo(inputRef.current.value.trim());
      inputRef.current.value = '';
    }
  };

  return (
    <>
      <div className='flex gap-2 mx-auto w-1/3'>
        <Input className='w-full' ref={inputRef} />
        <Button onClick={handleAddTodo}>添加</Button>
      </div>
    </>
  );
};

export default AddTodo;
