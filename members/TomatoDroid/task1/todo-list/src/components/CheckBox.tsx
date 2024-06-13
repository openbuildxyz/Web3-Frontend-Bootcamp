import { FC, useState } from 'react';
import './CheckBox.css'

export const CheckBox: FC<{checked: boolean, onChange: () => void}> = (props) => {
  
  return (
    <label className='checkcontainer m-r-3'>
        <input type='checkbox' {...props}></input>
        <div className='checkmark'></div>
    </label>
  );
};
