import PropTypes from 'prop-types';
export default function ToDoItem({item, setDone, handleDelete}) {
    return <li className="todoitem">
    <input type="checkbox" checked={item.done} onChange={(e) => setDone({...item, done: e.currentTarget.checked})} />
   <div className={`content ${item.done ? 'done' : ''}`}>
    <span> {item.desc}</span> 
    <button className='delete' onClick={() => handleDelete(item.id)}>delete</button>
   </div>
    </li>
}
ToDoItem.propTypes = {
    item: PropTypes.object,
    setDone: PropTypes.func,
    handleDelete:PropTypes.func,
  }