import {useState, useCallback} from 'react';
import {Space, Input, Button} from 'antd';
import './index.css'

function AddToDo({addTodo}) {
  // todo 项列表
  const [todo, setTodo] = useState('');

  // 改变todo项状态
  const add = useCallback(() => {
    todo && addTodo(todo);
    setTodo('');
  }, [addTodo, todo]);

  return (
    <div className="add-todo">
      <Space.Compact style={{ width: '100%' }}>
        <Input value={todo} onChange={(e) => setTodo(e.target.value)} />
        <Button type="primary"onClick={add}>添加待办项</Button>
    </Space.Compact>
    </div>
  )
}

export default AddToDo;
