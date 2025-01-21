const Item = ({ id, note, date, time, deleteData,submittingStatus,item}) => {
  function deleteItem() {
    deleteData((prev) => {
      submittingStatus.current = true
      const filtered = prev.filter((item) => item.id !== id);
      console.log("Filtered items:", filtered); // 查看过滤后的结果
      return filtered;
    });
    
  }
  return (
    <div className="item">
      <div>
        <p>{note}</p>
        <p>{date ? `${date} ${time}` : "none"}</p>
      </div>
      <button onClick={deleteItem} className="remove" >删除</button>
    </div>

  );
};
export default Item;
