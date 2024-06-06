/* eslint-disable react/prop-types */
import { useState } from "react";
import "./toDoItem.less"
import { Checkbox,Tooltip,Button } from 'antd';

function ToDoItem(props) {
    // eslint-disable-next-line react/prop-types
    const {item,removeTodo} = props;
    const [check,setCheck] = useState(false)
    const onChange = (e) => {
        setCheck(e.target.checked)
        console.log(`checked = ${e.target.checked}`);
      };
      const removeTodoItem=()=>[
        // eslint-disable-next-line react/prop-types
        removeTodo(item.id)
      ]
      
  return (
    
       <div className={`item_container  ${check ? 'checked' : 'unchecked'}`}>
           <Checkbox onChange={onChange} className="check_box"/>
           <div className="item_text_box">
                <Tooltip title={check ? '已完成' : '未完成'}>
                        <span className={`item_text ${check ? 'checked' : 'unchecked'}`}>{item.text}</span>
                </Tooltip>
           </div> 
            <Button type="primary" className="item_deleted" onClick={removeTodoItem}>x</Button>
    </div>

   
  );
}

export default ToDoItem;