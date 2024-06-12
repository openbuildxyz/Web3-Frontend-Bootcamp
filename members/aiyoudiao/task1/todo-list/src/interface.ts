import React, { ReactNode } from "react";

export interface StoreType {
  todoList: string[];
}

export interface StoreContextType extends StoreType {
  dispatch: React.Dispatch<ActionType>;
}

export interface ActionType {
  type: string;
  payload?: string;
}

export interface TodoHeaderProps {
  children: ReactNode;
}

export interface TodoItemProps {
  todo: string;
}
