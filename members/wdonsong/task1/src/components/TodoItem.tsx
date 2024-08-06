interface Props {
  text: string;
  //   handleDeleteItem: (id: number) => void;
  //   id: number;

  fullfilled: boolean;
  onClick: () => void;
}

function TodoItem({ text, onClick, fullfilled }: Props) {
  return (
    <>
      <span
        onClick={onClick}
        style={{
          color: fullfilled ? "red" : "black",
          cursor: "pointer",
        }}
      >
        {text}
      </span>
      {/* <button onClick={() => handleDeleteItem(id)}>删除</button> */}
    </>
  );
}

export default TodoItem;
