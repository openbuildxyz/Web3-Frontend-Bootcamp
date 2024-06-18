import { useEffect, useReducer } from 'react'
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
  COMPLETE_ITEM = 'complete_item',
  UPDATE_LISTS = 'update_lists',
}

export interface ListsInterface {
  item: string,
  completed: boolean,
};

interface listAction {
  type: ActionType,
  item: ListsInterface,
  lists?: ListStateInterface,
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
    lists,
  } = action;

  if (type === ActionType.ADD_ITEM) {
    const lists = [...state.lists, item];

    return {
      lists
    };
  }

  if (type === ActionType.DELETE_ITEM) {
    const lists = state.lists.slice();
    lists.splice(state.lists.findIndex(n => n.item === item.item), 1);

    return {
      lists
    };
  }

  if (type === ActionType.COMPLETE_ITEM) {
    const lists = state.lists.map(n => {
      if(n.item === item.item){
        n.item = item.item;
      }

      return n;
    });

    return {
      lists
    };
  }

  if(type === ActionType.UPDATE_LISTS){
    if(!lists){
      return {
        lists: [],
      };
    }

    return {
      lists,
    };
  }

  throw Error('Unknown action.');
};

function createInitialLists(todos: ListsInterface[]): ListStateInterface {
  const lists = localStorage.getItem('todo-list');

  if (lists) {
    return {
      lists: JSON.parse(lists),
    } as listAction;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialLists, createInitialLists);

  useEffect(() => {
    localStorage.setItem('todo-list', JSON.stringify(state.lists));
  }, [state.lists]);

  // add todo-list item
  const onAdd = (item: string) => {
    if(!item){
      alert('请输入待办事项!');

      return;
    }

    const newItem = {
      item,
      completed: false,
    };
    
    dispatch({
      type: ActionType.ADD_ITEM,
      item: newItem,
    });
  };

  // delete todo-list item
  const onDelete = (item: ListsInterface) => {
    dispatch({
      type: ActionType.DELETE_ITEM,
      item,
    });
  };

  // complete todo item
  const onComplete = (item: ListsInterface, status: boolean) => {
    item.completed = status;

    dispatch({
      type: ActionType.COMPLETE_ITEM,
      item,
    });
  };

  return (
    <div className='app'>
      <Header />
      <AddToDo onAdd={onAdd}/>
      {
        state.lists.length > 0 ? <TodoList lists={state.lists} onDelete={onDelete} onComplete={onComplete} /> : <Empty />
      }
    </div>
  )
}

export default App
