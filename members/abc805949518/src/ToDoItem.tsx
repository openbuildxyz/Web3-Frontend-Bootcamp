import { useState } from 'react'

function AddToDo (props:any) {
  const {item, setListData, listData} = props;
  const {checked, text, id} = item;

  let chooseStyle ={
    textDecoration: item?.checked ? 'line-through' : 'none',
    color: item?.checked ? '#ccc' : '#000',
    // backgroundColor: item?.checked ? '#ccc' : '#fff',
  }

  const changeListData = () => {
    let newListData = listData.map((item:any) => {
      if(item.id === id){
        item.checked = !item.checked;
      }
      return item;
    })
    setListData(newListData);
  }

  const delListData = () =>{
    let newListData = listData.filter((item:any) => item.id !== id);
    setListData(newListData);
  }

  return (
    <div className='todo-item'>
      <div style={chooseStyle} onClick={changeListData}>
          {item?.text}
      </div>
      <div>
        <button onClick={delListData}>删除</button>
      </div>
    </div>
    )
}

export default AddToDo 
