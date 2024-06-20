import {useEffect, useState} from "react";
import type {IComponentBase, ITodoItem} from "@/types";
import {cn} from "@/lib/utils.ts";

interface IProps extends IComponentBase {
    list: ITodoItem[]
}

const ToDoCount = ({list, className}: IProps) => {
    const [todoCount, setTodoCount] = useState(0);
    const [doingCount, setDoingCount] = useState(0);
    const [completeCount, setCompleteCount] = useState(0);

    useEffect(() => {
        setTodoCount(list.length)
        setDoingCount(list.filter(x => x.state === 'doing').length)
        setCompleteCount(list.filter(x => x.state === 'complete').length)
    }, [list])

    return (
        <>
            <div className={cn("w-full flex items-center justify-between text-sm", className)}>
                <div className="flex items-center">
                    <span className="">待办事项：</span>
                    <span className={cn('mx-0.5 text-sm font-bold',doingCount!==0?'text-blue-500':'')}>{doingCount}</span>
                    <span className="">（项）</span>
                </div>
                <div className="flex items-center">
                    <span className="">已办事项：</span>
                    <span className={cn('mx-0.5 text-sm font-bold',completeCount!==0?'text-green-500':'')}>{completeCount}</span>
                    <span className="">（项）</span>
                </div>
                <div className="flex items-center">
                    <span className="">总计：</span>
                    <span className={cn('mx-0.5 text-sm font-bold',todoCount!==0?'text-orange-600':'')}>{todoCount}</span>
                    <span className="">（项）</span>
                </div>
            </div>
        </>
    )
}

export default ToDoCount;
