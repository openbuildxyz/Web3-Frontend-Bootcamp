import { useState } from 'react'

function AddToDo(props:any) {
    const {listData, setListData} = props;
  const [text, setText] = useState('');
  const UUID = (len = 32) =>
    'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'
      .replace(/[xy]/g, (c) => {
        /* eslint-disable no-bitwise */
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
  
        return v.toString(16);
      })
      .substring(0, len);

  const buttonClick = () => {
    let data ={
          id: UUID(),
          text: text,
          checked: false,
        };
    console.log(data);
    setListData([...listData, data]);
    setText('');
    localStorage.setItem('listData', JSON.stringify([...listData, data]));
  }


  return (
    <div>
        <input value={text} onChange={(data:any) => setText(data.target.value)} />
        <button onClick={buttonClick}>Add</button>
    </div>
  )
}

export default AddToDo
