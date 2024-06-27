import React from 'react';
import { TodoItem } from '../App';
import styled from 'styled-components';

interface ToDoItemProps {
    todoItem: TodoItem;
    onDeleteItem: (id: number) => void;
    onTickItem: (id: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todoItem, onDeleteItem, onTickItem }: ToDoItemProps) => {
    return (
        <StyledTodoItem onClick={() => { onTickItem(todoItem.id) }}>
            <input type="checkbox" checked={todoItem.completed} readOnly style={{ cursor: 'pointer' }} />
            <ItemText $completed={todoItem.completed}>{todoItem.text}</ItemText>
            <button onClick={(event) => { event.stopPropagation(); onDeleteItem(todoItem.id) }}>❌</button>
        </StyledTodoItem>
    );
};

export default ToDoItem;

const ItemText = styled.span<{ $completed: boolean }>`
    width: 200px;
    margin-left: 0.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: ${(props) => (props.$completed ? 'line-through' : 'none')};
    `;

const StyledTodoItem = styled.li`
    display: flex;
    padding: 6px;
    align-items: center;
    cursor: pointer;

    &:not(:last-child) {
      border-bottom: 1px solid #e1e4d9;
    }

    &:hover {
      background-color: #f9f9f9;
    }
    `;
