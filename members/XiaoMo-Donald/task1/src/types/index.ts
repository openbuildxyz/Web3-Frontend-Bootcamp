import React from "react";

export interface IComponentBase {
    className?: string;
}

export interface IDockNavbar {
    key: string,
    title: string,
    desc: string,
    path: string,
    icon?: string
}

export interface ITodoItem {
    id?: string | undefined,
    state: "todo" | "doing" | 'complete',
    title: string,
    description: string,
    createdAt?: number | undefined,
    completeAt?: number | undefined,
}


export interface ICallbackEventsCallbackData<T> {
    type: T,
    data?: ITodoItem | boolean | string | null,
    event?: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
}

export interface IComponentPropsBase<T> {
    onCallbackEvents: (callbackData: ICallbackEventsCallbackData<T>) => void,
}

// ----------------事件类型---------------

// 监听添加组件事件
export type AddMapCallbackEventTypes = 'add' | 'addModal' | 'empty' | 'refresh' | 'search'

// 监听列表事件
export type ListMapCallbackEventTypes = 'edit' | 'delete' | 'complete' | 'detail' | 'doing'

// 监听弹窗事件
export type ModalMapCallbackEventTypes = 'open' | 'close' | 'add' | 'edit'

// ----------------事件类型---------------
