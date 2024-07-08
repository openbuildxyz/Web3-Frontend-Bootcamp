import React, { useCallback, useState } from 'react';
import { TodoItem } from '../App';
import { styled } from 'styled-components';

interface AddToDoProps {
    setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

type NewTodoItem = string;

const AddToDo: React.FC<AddToDoProps> = ({ setTodos }: AddToDoProps) => {
    const [newTodoItem, setNewTodoItem] = useState<NewTodoItem>('');

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoItem(event.target.value);
    }, []);

    const handleAddTodo = useCallback((newTodoItem: NewTodoItem) => {
        if (newTodoItem.trim() === '') return;
        setNewTodoItem('');
        setTodos((prevTodos: TodoItem[]) => [
            ...prevTodos,
            {
                id: prevTodos.length ? prevTodos[prevTodos.length - 1].id + 1 : 1,
                text: newTodoItem,
                completed: false,
            },
        ]);
    }, [setTodos]);

    const AddOnEnter = useCallback((event: React.KeyboardEvent<HTMLInputElement>, newTodoItem: NewTodoItem) => {
        if (event.key === 'Enter') {
            event.preventDefault;
            handleAddTodo(newTodoItem);
        }
    }, [handleAddTodo]);

    return (
        <InputWrapper>
            <NewItemInput type="text" value={newTodoItem}
                onKeyDown={(event) => { AddOnEnter(event, newTodoItem) }}
                onChange={handleInputChange} placeholder='Add a task...' />
            <button onClick={() => { handleAddTodo(newTodoItem) }}>➕</button>
        </InputWrapper>
    );
};

export default AddToDo;

const NewItemInput = styled.input`
    border: none;
    outline: none;
    box-shadow: none;
    background-color: transparent;
    padding: 0.5em;
    font-size: 1em;

    &::placeholder {
        color: #c5c8be;
    }
    `

const InputWrapper = styled.div`
    display: flex;
    border: 4px solid #f9f9f9;
    border-radius: 12px;
    `