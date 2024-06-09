import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Item } from '../types'

const TodoItem: React.FC<{
  todo: Item
  key: string
  remove: (uuid: string) => void
  toggle: (uuid: string) => void
}> = props => {
  const labelId = `checkbox-list-label-${props.todo.uuid}`

  const removeTodo = () => {
    props.remove(props.todo.uuid)
  }

  return (
    <ListItem
      key={props.todo.uuid}
      secondaryAction={
        <IconButton edge="end" aria-label="comments" onClick={removeTodo}>
          <DeleteOutlineIcon sx={{ color: '#eb5e28' }} />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton role={undefined} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={props.todo.completed}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
            onChange={e => {
              console.log(e.target.checked)
              props.toggle(props.todo.uuid)
            }}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleOutlineIcon />}
            color="warning"
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={props.todo.text} />
      </ListItemButton>
    </ListItem>
  )
}
export default TodoItem
