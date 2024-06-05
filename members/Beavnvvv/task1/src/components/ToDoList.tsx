import ToDoItem from "./ToDoItem";

interface IProps {
  data: { value: string; todo: boolean }[];
  deleteItem: (val: string) => void;
  changeStatus: (val: string, status: boolean) => void;
}
const ToDoList: React.FC<IProps> = ({ data, deleteItem, changeStatus }) => {
  return (
    <>
      {data?.map((el) => (
        <ToDoItem
          key={el?.value}
          content={el}
          deleteItem={deleteItem}
          changeStatus={changeStatus}
        />
      ))}
    </>
  );
};

export default ToDoList;
