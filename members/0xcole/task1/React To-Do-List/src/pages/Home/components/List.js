import Item from "./Item";

  
const List = ({ listData, deleteData ,submittingStatus}) => {
  // console.log("List Data:", listData); // 检查当前的列表数据
  return (
    <div className="list">
      {
        listData.map(item=>{
          const {note,date,time,id} = item
          // key换成uuid 确保全部值传进去
          return <Item  id={id} note={note} date={date} time={time} key={id} deleteData={deleteData} submittingStatus={submittingStatus}/>

        }

      )
      }

    </div> 
  );
};
export default List;
