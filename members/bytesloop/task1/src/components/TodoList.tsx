import { useState, useEffect } from 'react'
import { Box, List, Typography, createTheme, ThemeProvider } from '@mui/material'
import Header from './Header'
import FilterBtn from './FilterBtn'
import TodoItem from './TodoItem'
import AddTodo from './AddTodo'
import { Item } from '../types'

const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(',')
  }
})

const styles = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  m: 3,
  backgroundColor: 'white',
  paddingBottom: '40px',
  margin: '3rem 0 3rem 0',
  padding: '1rem',
  position: 'relative',
  webkitBoxShadow: '0px 15px 0px -5px #ef8257, 0px 30px 0px -10px #f39e7c, 5px 5px 15px 5px rgba(0,0,0,0)',
  boxShadow: '0px 14px 0px -5px #ef8257, 0px 28px 0px -10px #f39e7c, 5px 5px 15px 5px rgba(0,0,0,0)',
  border: '2px solid #252422',
  maxWidth: '38rem',
  marginLeft: 'auto',
  marginRight: 'auto'
}

const FILTER_MAP = {
  All: () => true,
  Active: (todo: Item) => !todo.completed,
  Completed: (todo: Item) => todo.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

export default function TodoList() {
  let savedItems = localStorage.getItem('todos')
  if (savedItems) {
    savedItems = JSON.parse(savedItems)
  }
  const [todos, setTodos] = useState((savedItems || []) as Item[])
  const [filter, setFilter] = useState('All')

  const filterList = FILTER_NAMES.map(name => (
    <FilterBtn key={name} name={name} isPressed={name === filter} setFilter={setFilter} />
  ))

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // 删除
  const removeTodo = (uuid: string) => {
    setTodos((prevTodos: Item[]) => {
      return prevTodos.filter(t => t.uuid !== uuid)
    })
  }

  // 修改
  const toggleTodo = (uuid: string) => {
    setTodos((prevTodos: Item[]) => {
      return prevTodos.map(todo => {
        if (todo.uuid === uuid) {
          return { ...todo, completed: !todo.completed }
        } else {
          return todo
        }
      })
    })
  }

  // 添加
  const addTodo = (text: string) => {
    if (text.trim() === '') return
    setTodos((prevTodo: Item[]) => {
      return [
        ...prevTodo,
        {
          uuid: crypto.randomUUID(),
          text: text,
          completed: false
        }
      ]
    })
  }

  const taskList = todos
    .filter(FILTER_MAP[filter as keyof typeof FILTER_MAP])
    .map(todo => <TodoItem todo={todo} key={todo.uuid} remove={removeTodo} toggle={() => toggleTodo(todo.uuid)} />)

  return (
    <ThemeProvider theme={theme}>
      <Box className="TodoList" sx={styles}>
        <List
          sx={{
            width: '100%',
            maxWidth: 500,
            bgcolor: 'background.paper',
            fontFamily: 'inherit'
          }}
        >
          <Header name="React To Do List" />
          <AddTodo addTodo={addTodo} />
          {taskList}
          <Typography
            variant="h5"
            component="h5"
            sx={{
              display: 'flex',
              marginTop: '10px',
              justifyContent: 'space-between'
            }}
          >
            {taskList.length} task{taskList.length !== 1 && 's'} left
            <span>{filterList}</span>
          </Typography>
        </List>
      </Box>
      <h5 style={{ textAlign: 'center', fontWeight: 100, fontSize: '1rem' }}>
        made by{' '}
        <a
          href="https://github.com/bytesloop"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: 'none', color: '#eb5e28' }}
        >
          BytesLoop
        </a>
      </h5>
    </ThemeProvider>
  )
}
