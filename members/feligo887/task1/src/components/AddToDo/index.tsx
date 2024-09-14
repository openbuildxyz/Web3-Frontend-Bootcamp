import { useState } from 'react'
import { Input, Button } from '@mui/material'

import { addToDoList } from '../../store/modules/toDoList.ts'

const AddToDo = () => {
    const [ inpVal, setInpVal ] = useState<string>( '' )
    const handleButton = () => {
        addToDoList( inpVal )
        setInpVal( '' )
    }

    return (
        <div>
            <Input value={ inpVal }
                   onChange={ ( event: React.ChangeEvent<HTMLInputElement> ) => setInpVal( event.target.value ) }/>
            <Button variant="contained" size="small" onClick={ handleButton }>Add</Button>
        </div>
    )
}

export default AddToDo
