import classes from './ToDoItem.module.css';
// ToDoItem 组件：展示单个待办事项。

const ToDoItem = (props: { todo: string, id: string, completed: boolean, handleDelete: (id: string) => void, toggleToDo: (id: string) => void }) => {
  console.log('ToDoItem rendered', props);
  // 删除待办事项：每个待办事项旁边有一个删除按钮，点击后可以删除该事项。
  const deleteHandler = () => {
    props.handleDelete(props.id);
  }
  // 切换待办事项状态：每个待办事项旁边有一个切换按钮，点击后可以切换该事项的状态（已完成或未完成）。
  const toggleHandler = () => {
    props.toggleToDo(props.id);
  }

  // 实现组件逻辑
  return (
    <div className={classes.item}>
      <span className={classes.todo} style={{ textDecoration: props.completed ? 'line-through' : 'none' }}>
        {props.todo}
      </span>
      <button className={classes.toggle} onClick={toggleHandler}>
        {props.completed ? '未完成' : '已完成'}
      </button>
      <button className={classes.delete} onClick={deleteHandler}>
        删除
      </button>
    </div>
  )
}

export default ToDoItem
