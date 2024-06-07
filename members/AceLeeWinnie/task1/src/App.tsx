import { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4  } from 'uuid';
import ToDoList from './components/toDoList';
import Header from './components/header';
import type { IToDoItem } from './components/toDoItem';
import AddToDo from './components/addToDo';

import './App.css'



const STORAGE_ID = 'task1-todolist';

const saveToLocal = (list: IToDoItem[] = []) => {
  window.localStorage.setItem(STORAGE_ID, JSON.stringify(list));
  console.info('===saved===', list);
}

const restoreFromLocal = () => {
  const allText = window.localStorage.getItem(STORAGE_ID) || '[]';
  const defaultValue: IToDoItem[] = [];
  try {
    const list = JSON.parse(allText);
    return Array.isArray(list) ? list : defaultValue;
  } catch(e) {
    console.error(e);
    return defaultValue;
  }
}

const App: React.FC = () => {
  const [list, setList] = useState<IToDoItem[]>(restoreFromLocal());
  const [hidden, setHidden] = useState<boolean>(true);

  useEffect(() => {
    saveToLocal(list);
  }, [list]);

  const onAdd = useCallback((text: string) => {
    const nextList = [{
      id: uuidv4(),
      text: text.trim(),
      done: false,
    }, ...list];
    setList(nextList);
  }, [list]);

  const onRemove = useCallback((id: string) => {
    setList(list.filter(d => d.id !== id));
  }, [list]);

  const onDone = useCallback((id: string, flag: boolean) => {
    const nextList = list.map(d => {
      return d.id !== id ? d : {...d, done: flag};
    }).sort((a: IToDoItem, b: IToDoItem) => (a.done as any as number) - (b.done as any as number));
    
    setList(nextList);
  }, [list]);

  const handleHidden = useCallback(() => {
    setHidden(!hidden);
  }, [hidden]);

  const tool = useMemo(() => {
    return <button onClick={handleHidden}>{hidden ? '查看所有' : '只看未完成'}</button>
  }, [handleHidden]);

  const showList = useMemo(() => {
    return !hidden ? list : list.filter(d => !d.done);
  }, [hidden, list]);

  return (
    <div>
      <Header tool={tool}/>
      <AddToDo onAdd={onAdd}/>
      <ToDoList list={showList} onRemove={onRemove} onDone={onDone}/>
    </div>
  )
}

export default App
