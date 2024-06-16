import PropTypes from 'prop-types';
import ToDoItem from './ToDoItem';
export default function ToDoList({list, setDone, handleDelete}) {
   return ( <ul>
        {list.map(item => 
            <ToDoItem item={item} handleDelete={handleDelete} setDone={setDone} key={item.id}  />
        )}
    </ul>
   )
}
ToDoList.propTypes = {
    list: PropTypes.array,
    setDone: PropTypes.func,
    handleDelete:PropTypes.func,
  }