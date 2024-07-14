import React, { useCallback } from 'react';
import ToDoItem from './ToDoItem';
import { TodoItem } from '../App';
import styled from 'styled-components';

interface ToDoListProps {
    todos: TodoItem[];
    setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

const ToDoList: React.FC<ToDoListProps> = ({ todos, setTodos }: ToDoListProps
) => {
    const handleDeleteItem = useCallback((id: number) => {
        setTodos((prevTodos: TodoItem[]) => prevTodos.filter(todo => todo.id !== id));
    }, [setTodos]);

    const handleTickItem = useCallback((id: number) => {
        setTodos((prevTodos: TodoItem[]) => prevTodos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    }, [setTodos]);

    return (
        <ToDoListWrapper>
            {todos.length ?
                <ItemsList>
                    {todos.map(todo => (
                        <ToDoItem key={todo.id} todoItem={todo} onDeleteItem={handleDeleteItem} onTickItem={handleTickItem} />
                    ))}
                </ItemsList>
                : <PlaceHolderText>What a free day 🥳</PlaceHolderText>
            } </ToDoListWrapper>
    );
};

export default ToDoList;

const ToDoListWrapper = styled.div`
    display: flex;
    justify-content: center;
    height: 400px;
    overflow-y: auto;
    scrollbar-gutter: stable;
    margin: 1em 0;
    min-width: 320px;
`;

const PlaceHolderText = styled.p`
    text-align: center;
    margin: auto;
    color: cornflowerblue;
`;

const ItemsList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;
