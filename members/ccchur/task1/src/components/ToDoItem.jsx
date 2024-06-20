function ToDoItem({ todo,index, handleDeleteTodo, handleToggleComplete,handleToggleUncomplete }) {
  return (
     <>
  <li style={{ display: 'flex', justifyContent: 'pace-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' }}>
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', fontSize: '16px' }}> {'>' + todo.text} {todo.status? todo.status: ''}</span>
    <div style={{ display: 'flex' }}>
      <button onClick={() => handleToggleComplete(index)} style={{ padding: '5px 10px', backgroundColor: 'lightblue', border: 'none', cursor: 'pointer', marginRight:'15px',marginLeft:'15px' }}>标记完成</button>
      <button onClick={() => handleToggleUncomplete(index)} style={{ padding: '5px 10px', backgroundColor: '#f6f21e', border: 'none', cursor: 'pointer', marginRight:'15px' }}>未完成</button>
     
                  <button onClick={() => handleDeleteTodo(index)} style={{ padding: '5px 10px', backgroundColor: 'pink', border: 'none', cursor: 'pointer' }}>删除</button>
    </div>
  </li>
</>
  );
}
export { ToDoItem };  