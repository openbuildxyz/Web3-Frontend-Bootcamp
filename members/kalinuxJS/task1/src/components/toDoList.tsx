
interface TodoItem {
    content: string;
    completed: boolean;
}

interface TodoListProps {
    list: TodoItem[];
    changeList: (list: TodoItem[]) => void;
}

const ToDoList = ({list, changeList}: TodoListProps) => {
    const handleComplete = (index: number) => {
        const newList = [...list]; // 创建新数组，避免直接修改原数组
        newList[index].completed = !newList[index].completed;
        changeList(newList);
    }
    
    const handleDelete = (index: number) => {
        const newList = [...list]; // 创建新数组，避免直接修改原数组
        newList.splice(index, 1);
        changeList(newList);
    }
    
    return (
        <div>
            {list.map((item, index) => (
                <div key={`${item.content}-${index}`}>
                    <span>{item.content}</span>
                    <span style={{color: item.completed ? 'green' : 'red', margin: '0 10px'}}>{item.completed ? '已完成' : '未完成'}</span>
                    <button onClick={() => handleComplete(index)} style={{margin: '0 10px',height: '30px',width: '100px',fontSize: '12px'}}>
                        {item.completed ? '未完成' : '完成'}
                    </button>
                    <button onClick={() => handleDelete(index)} style={{margin: '0 10px',height: '30px',width: '60px',fontSize: '12px',color: 'red'}}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    )
}

export default ToDoList;