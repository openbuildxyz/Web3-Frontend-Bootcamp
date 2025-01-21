import { useState } from "react";
import { v4 } from "uuid";

const Edit = ({ add,submittingStatus }) => {

  // 同样的模板复制三次
  const [note,setNote] = useState("")
  function noteChange(e) {
    setNote(e.target.value)
  }

  const [date,setDate] = useState("")
  function dateChange(e) {
    setDate(e.target.value)
  }

  const [time,setTime] = useState("")
  function timeChange(e) { 
    setTime(e.target.value)
  }
  
  
  function addItem() {
    submittingStatus.current= true
    add((prev)=>{
      return [{id:v4(),note,date,time},...prev]
    })
  }

  // console.log(note, date, time);
  return (
    <div>
      <h1>备忘录</h1>
      <p>记事:</p>
      {/* note */}
      <input type="text" value={note} onChange={noteChange} />
      <p>日期：</p>
      {/* date */}
      <input type="date" value={date} onChange={dateChange}/>
      <p>时间：</p>
      {/* time */}
      <input type="time" value={time} onChange={timeChange} />
      <button className="add" onClick={addItem}>
        新增
      </button>
    </div>
  );
};
export default Edit;
