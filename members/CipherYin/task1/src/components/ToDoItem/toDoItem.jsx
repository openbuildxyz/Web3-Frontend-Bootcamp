/* eslint-disable react/prop-types */
import "./toDoItem.less"
import { Checkbox,Tooltip,Button } from 'antd';

function ToDoItem(props) {
    // eslint-disable-next-line react/prop-types
    const {item,removeTodo,addHadCompleted} = props;
    const onChange = (e) => {
        addHadCompleted(item.id)
        console.log(`checked = ${e.target.checked}`);

      };
      const removeTodoItem=()=>[
        // eslint-disable-next-line react/prop-types
        removeTodo(item.id)
      ]
      
  return (
    
       <div className={`item_container  ${item.completed ? 'checked' : 'unchecked'}`}>
           <Checkbox onChange={onChange} className="check_box" checked={item.completed}/>
           <div className="item_text_box">
                <Tooltip title={item.completed ? '已完成' : '未完成'}>
                        <span className={`item_text ${item.completed ? 'checked' : 'unchecked'}`}>{item.text}</span>
                </Tooltip>
           </div> 
            <Button type="primary" className="item_deleted" onClick={removeTodoItem}>x</Button>
    </div>

   
  );
}

export default ToDoItem;