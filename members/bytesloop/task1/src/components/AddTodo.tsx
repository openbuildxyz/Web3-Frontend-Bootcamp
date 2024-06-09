import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined'
import { InputAdornment } from '@mui/material'
import { IconButton } from '@mui/material'
import React, { useState } from 'react'

const AddTodo: React.FC<{ addTodo: (text: string) => void }> = props => {
  const [text, setText] = useState('')

  return (
    <ListItem>
      <form
        onSubmit={e => {
          e.preventDefault()
          props.addTodo(text)
          setText('')
        }}
      >
        <TextField
          sx={{
            width: '470px'
          }}
          color="warning"
          id="outlined-basic"
          label="add task"
          variant="outlined"
          onChange={e => {
            setText(e.target.value)
          }}
          value={text}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="create todo" edge="end" type="submit">
                  <DoneOutlineOutlinedIcon sx={{ color: '#eb5e28' }} />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </form>
    </ListItem>
  )
}

export default AddTodo
