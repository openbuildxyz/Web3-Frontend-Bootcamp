import React from 'react'
import { Typography } from '@mui/material'

const Header: React.FC<{ name: string }> = props => {
  return (
    <>
      <Typography
        variant="h5"
        component="h4"
        sx={{
          color: '#eb5e28',
          paddingBottom: '10px',
          fontWeight: '500',
          textAlign: 'center'
        }}
      >
        {props.name || 'TodoList'}
      </Typography>
    </>
  )
}
export default Header
