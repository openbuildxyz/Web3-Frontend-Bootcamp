import { FC, useMemo } from 'react';
import { Todo, withStore, WithStoreChildProps } from './store';
import TodoItem from './ToDoItem';
import { List, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface Props extends WithStoreChildProps { }

const useStyles = makeStyles((theme: Theme) => {
  return {
    scrollContent: {
      overflow: 'hidden',
      overflowY: 'auto',
      maxHeight: '300px',
      backgroundColor: '#fafafa',
      marginBottom: 10,
    }
  }
});

const ToDoList: FC<Props> = (props: Props) => {
  const styles = useStyles();
  const { store } = props;

  const ui_item_controller = useMemo(() => {
    const onCheckChange = (todo: Todo, check: boolean) => {
      /** 懒的写替换方法了，先直接修改对象 */
      todo.done = check;
      store.setData([...store.data])
    }

    const onDelete = (todo: Todo) => {
      const res = confirm('确定删除？');
      if (res) {
        const datas = store.data.filter(item => item.id !== todo.id);
        store.setData(datas);
      }
    }

    const ans = [];
    for (let i = 0; i < store.data.length; i++) {
      ans.push(<TodoItem data={store.data[i]} onCheckChange={onCheckChange} onDelete={onDelete} />)
    }
    return ans;
  }, [store.data])

  return <div className={styles.scrollContent}>
    <List sx={{ width: '100%', maxWidth: 360, height: 300, bgcolor: 'background.paper' }}>
      {ui_item_controller}
    </List>
  </div>
}

export default withStore(ToDoList);