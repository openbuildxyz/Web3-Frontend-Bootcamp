import { useCallback, useEffect, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header'
import AddToDo from './components/AddToDo'
import ToDoItem, { ITodoItem } from './components/ToDoItem';
import ToDoItemList from './components/ToDoList';


import './App.css'

const STORAGE_ID = 'task1-todo-list';

const saveToLocal = (list: ITodoItem[] = []) => {
  window.localStorage.setItem(STORAGE_ID, JSON.stringify(list));
  console.log('saveToLocal', list);
}

const restoreFromLocal = () => {
  const allText = window.localStorage.getItem(STORAGE_ID) || '[]';
  const defaultValue: ITodoItem[] = [];
  try {
    const list = JSON.parse(allText);
    return Array.isArray(list) ? list : defaultValue;
  } catch (e) {
    console.error(e);
    return defaultValue;
  }
}

const App: React.FC = () => {
  const [list, setList] = useState<ITodoItem[]>(restoreFromLocal());
  const [hidden, setHidden] = useState<boolean>(true);

  useEffect(() => {
    saveToLocal(list);
  }, [list]);

  const onAdd = useCallback((text: string) => {
    const newList = [{
      id: uuidv4(),
      text: text.trim(),
      done: false,
    }, ...list];
    setList(newList);
  }, [list]);

  const onRemove  = useCallback((id: string) => {
    const newList = list.filter(item => item.id !== id);
    setList(newList);
  }, [list]);

  const onDone = useCallback((id: string, flag: boolean) => {
    const nextList = list.map(item => {
      return item.id !== id ?  item: {...item, done: flag };
    }).sort((a: ITodoItem, b: ITodoItem) => (a.done as any as number) - (b.done as any as number));
    setList(nextList);
  }, [list]);

  const handleHidden = useCallback(() => {
    setHidden(!hidden);
  }, [hidden]);

  const tool = useMemo(() => {
    return <button onClick={handleHidden} className="tool-btn">{hidden ? 'Show All' : 'Show Completed'}</button>
  }, [handleHidden]);

  const showList = useMemo(() => {
    return !hidden ? list : list.filter(item => !item.done);
  },[hidden, list]);

  return (
    <div>
      <Header tool = {tool} />
      <AddToDo onAdd={onAdd} />
      <ToDoItemList list={showList} onRemove={onRemove} onDone={onDone} />
    </div>
  )
}

export default App;
