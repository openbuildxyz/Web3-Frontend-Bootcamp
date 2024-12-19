import { Todo } from "./store"
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { DeleteOutlineOutlined } from '@mui/icons-material';

interface Props {
  data: Todo,
  onCheckChange: (todo: Todo, check: boolean) => void,
  onDelete: (todo: Todo) => void
}

const TodoItem = (props: Props) => {
  const { data, onCheckChange } = props;
  const handleToggle = () => {
    onCheckChange && onCheckChange(data, !data.done)
  };

  const ui_del_btn = <IconButton edge="end" onClick={() => props.onDelete(data)} aria-label="comments">
    <DeleteOutlineOutlined />
  </IconButton>

  return <div style={{ textDecoration: data.done ? 'line-through' : 'none', backgroundColor: data.done ? '#eee' : 'white' }}>
    <ListItem
      key={data.id}
      secondaryAction={ui_del_btn}
      disablePadding={true}
      dense={true}
    >
      <ListItemButton role={undefined} onClick={handleToggle} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={data.done}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': data.id }} />
        </ListItemIcon>
        <ListItemText primary={data.text} />
      </ListItemButton>
    </ListItem>
  </div>
}

export default TodoItem