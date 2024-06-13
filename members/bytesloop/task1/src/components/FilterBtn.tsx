import React from 'react'
import { Button } from '@mui/material'

const FilterBtn: React.FC<{
  key: string
  name: string
  isPressed: boolean
  setFilter: (name: string) => void
}> = props => {
  return (
    <Button
      type="button"
      onClick={() => props.setFilter(props.name)}
      variant="outlined"
      color="warning"
      sx={
        props.isPressed
          ? { border: '2px solid', marginLeft: '15px', color: '#eb5e28', borderColor: '#0d814c' }
          : { marginLeft: '15px', color: '#eb5e28', borderColor: '#eb5e28' }
      }
    >
      {props.name}
    </Button>
  )
}

export default FilterBtn
