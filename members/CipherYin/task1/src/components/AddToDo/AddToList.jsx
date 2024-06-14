import "./AddToList.less"
import { useState } from 'react';

function AddToList(props) {
    // eslint-disable-next-line react/prop-types
    const {onAdd} = props;
    const [text, setText] = useState('');

    const onSubmit = () => {
        if(text.length!=0){
            onAdd(text)
            console.log("onAdd函数执行, ",text)
            setText('')
        }
       
    }
    const handleChange = (event) => {
        setText(event.target.value);
      };

  return (
    
       <div className='search_container'>
        <input
            type="text"
            className="add_input"
            placeholder="输入待办事项"
            value={text}
            onChange={handleChange}
        />
        <button type="primary" className='add_btn' onClick={onSubmit}>添加</button>

          {/* <Search
            placeholder="添加新的代办事项"
            allowClear
            enterButton="添加"
            size="large"
            onSearch={onSubmit}
        /> */}
    </div>

   
  );
}

export default AddToList;