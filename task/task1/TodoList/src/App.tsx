import { useState, useReducer } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header'
import AddToDo from './AddToDo'
import TodoList from './TodoList'
import Empty from './Empty'

enum ActionType {
  ADD_ITEM = 'add_item',
  DELETE_ITEM = 'delete_item',
}

export interface ListsInterface {
  item: string,
};

interface listAction {
  type: ActionType,
  item: string,
}

interface ListStateInterface {
  lists: ListsInterface[]
}

const initialLists: ListStateInterface = {
  lists: []
};

function reducer(state: ListStateInterface, action: listAction): ListStateInterface {

  const {
    type,
    item,
  } = action;

  if (type === ActionType.ADD_ITEM) {
    const newItem = { item };
    const lists = [...state.lists, newItem];

    return {
      lists
    };
  }

  if (type === ActionType.DELETE_ITEM) {
    const lists = state.lists.slice();
    lists.splice(state.lists.findIndex(n => n.item === item), 1);

    return {
      lists
    };
  }

  throw Error('Unknown action.');
};

function App() {
  const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialLists);

  // add todo-list item
  const onAdd = (item: string) => {
    if(!item){
      alert('请输入待办事项!');

      return;
    }
    
    dispatch({
      type: ActionType.ADD_ITEM,
      item,
    });
  };

  // delete todo-list item
  const onDelete = (item: string) => {
    dispatch({
      type: ActionType.DELETE_ITEM,
      item,
    });
  };

  return (
    <div className='app'>
      <Header />
      <AddToDo onAdd={onAdd}/>
      {
        state.lists.length > 0 ? <TodoList lists={state.lists} onDelete={onDelete} /> : <Empty />
      }
    </div>
  )
}

export default App
