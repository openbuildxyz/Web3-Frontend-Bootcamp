import React, { useCallback, useState } from 'react';
import { withStore, WithStoreChildProps } from './store';
import { IconButton, Input } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface Props extends WithStoreChildProps {
  defaultValue?: string;
}
const AddToDo: React.FC<Props> = (props: Props) => {
  const { store, ...reset } = props;
  const [relValue, setRelValue] = useState('');
  
  const onTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRelValue(e.target.value);
  }, []);

  const onAddTodo = useCallback(() => {
    if (!relValue) return alert('请输入待办事项');
    const newData = {
      id: Date.now().toString(),
      text: relValue,
      done: false
    }
    setRelValue('');
    store.setData([newData, ...store.data]);
  }, [relValue]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      // 处理 Enter 键提交表单
      onAddTodo();
    }
  };

  return <React.Fragment>
    <Input
      sx={{ ml: 1, flex: 1 }}
      placeholder="请输入待办事项"
      inputProps={{ 'aria-label': 'search google maps' }}
      onChange={onTextChange}
      value={relValue}
      onKeyDown={handleKeyPress} // 监听键盘按下事件
      {...reset}
    />
    <IconButton onClick={onAddTodo} type="button" sx={{ p: '10px' }} aria-label="search">
      <AddCircleIcon />
    </IconButton>
  </React.Fragment>
}

export default withStore(AddToDo);